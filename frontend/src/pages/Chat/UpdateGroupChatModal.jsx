import React, { useEffect, useState } from "react";
import SvgIcon from "../../assets/icons/SvgIcon";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { renameGroup } from "../../services/chat";
import Loader from "../../components/Loader";
import ChatLoading from "../../components/ChatLoading";
import { showToastMessage } from "../../utils";
import { TOAST_POSITION, TOAST_TYPE } from "../../constants";
import useDebounce from "../../hooks/useDebounce";
import PopupModal from "../../components/PopupModal";
import UserBadgeItem from "../../components/UserBadgeItem";
import UserListItem from "../../components/UserListItem";
import Input from "../../components/Input";
import { getUsers } from "../../services/auth";
import { setSelectChat } from "../../redux/slices/chatSlice";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const { selectedChat } = useSelector((state) => state.chat);
  const [open, setOpen] = useState(false);

  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    setIsLoading(true);
    getUsers(debouncedSearch, setIsLoading, setSearchResult);
  }, [debouncedSearch]);

  const handleRenameChatData = (data) => {
    dispatch(setSelectChat(data));
    setFetchAgain(!fetchAgain);
  };

  const handleRenameGroup = () => {
    setRenameLoading(true);
    renameGroup(
      selectedChat?._id,
      groupChatName,
      setRenameLoading,
      handleRenameChatData
    );
  };

  const handleAddUser = async (user1) => {
    if (selectedChat?.users?.find((u) => u?._id === user1?._id)) {
      showToastMessage(TOAST_TYPE.WARNING, "User Already in group!", {
        position: TOAST_POSITION.BOTTOM_CENTER,
      });
      return;
    }

    if (selectedChat?.groupAdmin?._id !== user?._id) {
      showToastMessage(TOAST_TYPE.ERROR, "Only admins can add someone!", {
        position: TOAST_POSITION.BOTTOM_CENTER,
      });
      return;
    }
  };

  const handleRemove = async (user1) => {
    if (
      selectedChat?.groupAdmin?._id !== user._id &&
      user1?._id !== user?._id
    ) {
      showToastMessage(TOAST_TYPE.ERROR, "Only admins can remove someone!", {
        position: TOAST_POSITION.BOTTOM_CENTER,
      });

      return;
    }
  };

  return (
    <div>
      <span
        className="flex items-center justify-center cursor-pointer bg-[#a3a3a34a] w-[32px] h-[32px] rounded"
        onClick={() => setOpen(true)}
      >
        <SvgIcon iconName="eye" />
      </span>

      <PopupModal
        open={open}
        close={() => setOpen(false)}
        className="create-group-chat-modal"
      >
        <header>
          <div className="flex justify-center text-[30px] mb-5">
            {selectedChat?.chatName}
          </div>
        </header>
        <main className="text-sm">
          <div className="w-full flex flex-wrap pb-3">
            {selectedChat?.users?.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat?.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </div>
          <div>
            <div className="flex">
              <Input
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e?.target?.value)}
              />
              <Button onClick={handleRenameGroup} disabled={renameLoading}>
                {renameLoading ? <Loader size={"small"} /> : "Update"}
              </Button>
            </div>
            <Input
              placeholder="Add user to group"
              value={search}
              onChange={(e) => setSearch(e?.target?.value)}
            />
            <div className="flex flex-wrap w-full">
              {isLoading ? (
                <ChatLoading />
              ) : (
                <div className="h-48 w-full flex flex-col gap-2 p-2 overflow-y-auto border border-[#cacaca]">
                  {searchResult?.map((user) => (
                    <UserListItem
                      key={user?._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                      //   className={
                      //     selectedUsers?.includes(user)
                      //       ? "bg-gray-400 hover:bg-gray-400 hover:text-black cursor-default"
                      //       : ""
                      //   }
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
          <Button onClick={() => handleRemove(user)} variant="danger">
            Leave Group
          </Button>
        </footer>
      </PopupModal>
    </div>
  );
};

export default UpdateGroupChatModal;
