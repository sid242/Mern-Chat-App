import React, { useEffect, useState } from "react";
import PopupModal from "../../components/PopupModal";
import Input from "../../components/Input";
import UserBadgeItem from "../../components/UserBadgeItem";
import useDebounce from "../../hooks/useDebounce";
import { getUsers } from "../../services/auth";
import Loader from "../../components/Loader";
import UserListItem from "../../components/UserListItem";
import { showToastMessage } from "../../utils";
import { TOAST_POSITION, TOAST_TYPE } from "../../constants";
import Button from "../../components/Button";
import { createGroup } from "../../services/chat";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../../redux/slices/chatSlice";
import ChatLoading from "../../components/ChatLoading";

const GroupChatModal = ({ children }) => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 1000);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      getUsers(debouncedSearch, setIsLoading, setSearchResult);
    }
  }, [debouncedSearch, open]);

  useEffect(() => {
    return () => {
      setGroupChatName("");
      setSelectedUsers([]);
      setSearchResult([]);
      setSearch("");
    };
  }, [open]);

  const handleAddUser = (userToAdd) => {
    if (selectedUsers?.includes(userToAdd)) {
      showToastMessage(TOAST_TYPE.WARNING, "User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroupData = (data) => {
    dispatch(setChats([...chats, data]));
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!groupChatName || !selectedUsers?.length) {
      showToastMessage(TOAST_TYPE.ERROR, "Please fill all the feilds", {
        position: TOAST_POSITION.BOTTOM_CENTER,
      });
      return;
    }
    setIsCreating(true);
    createGroup(groupChatName, selectedUsers, setIsCreating, handleGroupData);
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <PopupModal
        open={open}
        close={() => setOpen(false)}
        className="create-group-chat-modal"
      >
        <header>
          <div className="flex justify-center text-[30px] mb-5">
            Create Group Chat
          </div>
        </header>
        <main className="text-sm">
          <div>
            <Input
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e?.target?.value)}
            />
            <Input
              placeholder="Search and Select Users eg: John, Jane, Sid"
              value={search}
              onChange={(e) => setSearch(e?.target?.value)}
            />
            <div className="flex flex-wrap w-full">
              {selectedUsers?.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
              {isLoading ? (
                <div className="h-48 w-full flex flex-col gap-2 p-2 overflow-y-auto border border-[#cacaca]">
                  <ChatLoading />
                </div>
              ) : (
                <div className="h-48 w-full flex flex-col gap-2 p-2 overflow-y-auto border border-[#cacaca]">
                  {searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                      className={
                        selectedUsers?.includes(user)
                          ? "bg-gray-400 hover:bg-gray-400 hover:text-black cursor-default"
                          : ""
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <footer className="mt-5 pt-3 flex justify-end border-t-2">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={isCreating}>
            {isCreating ? <Loader size={"small"} /> : "Create Group"}
          </Button>
        </footer>
      </PopupModal>
    </>
  );
};

export default GroupChatModal;
