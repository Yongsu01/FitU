import React, { useState } from "react";
import styled from "styled-components";
import AdminHeader from "../../components/adminHeader/adminHeader";
import IdSearch from "../../components/adminSearch/adminSearchId";

const AdminPost: React.FC = () => {
  const [active, setActive] = useState<"request" | "post" | "member">("member");
  const [selectedId, setSelectedId] = useState("");

  return (
    <>
      <AdminHeader active={active} setActive={setActive} />

      <Post>
        <IdSearch onIdSelect={setSelectedId} />
      </Post>

      <Selected>{selectedId}</Selected>
    </>
  );
};

export default AdminPost;

const Post = styled.div``;
const Selected = styled.div``;
