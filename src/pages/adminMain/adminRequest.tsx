import React, { useState } from "react";
import styled from "styled-components";
import AdminHeader from "../../components/adminHeader/adminHeader";
import AdminTab from "../../components/adminTab/adminTab";

const AdminRequest: React.FC = () => {
  const [active, setActive] = useState<"request" | "post" | "member">(
    "request"
  );

  return (
    <>
      <AdminHeader active={active} setActive={setActive} />
      <AdminTab />
      <Request></Request>
    </>
  );
};

export default AdminRequest;

const Request = styled.div``;
