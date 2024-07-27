import React, { useState } from "react";
import Input from "../Input";
import Loader from "../Loader";
import UserListItem from "../UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { setSelectChat, setChats } from "../../redux/slices/chatSlice";
import { accessChat } from "../../services/chat";
import { getUsers } from "../../services/auth";
import Button from "../Button";
import ChatLoading from "../ChatLoading";

const SearchUser = ({ close }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { chats } = useSelector((state) => state.chat);

  const handleData = (data) => {
    if (!chats.find((c) => c._id === data._id)) {
      dispatch(setChats([data, ...chats]));
    }
    dispatch(setSelectChat(data));
    close();
  };

  const doSelectChat = async (userId) => {
    setLoadingChat(true);
    accessChat(userId, setLoadingChat, handleData);
  };

  const handleSearch = () => {
    setLoading(true);
    getUsers(search, setLoading, setSearchResult);
  };

  return (
    <div className="m-2">
      <div className="flex justify-between gap-2">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key?.toLowerCase() === "enter" && handleSearch()}
        />
        <Button disabled={!search?.length} onClick={handleSearch}>
          Go
        </Button>
      </div>
      {loading ? (
        <ChatLoading />
      ) : searchResult?.length ? (
        searchResult?.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => doSelectChat(user._id)}
          />
        ))
      ) : (
        <h4>No user found</h4>
      )}
      {loadingChat && <Loader size="small" />}
    </div>
  );
};

export default SearchUser;
