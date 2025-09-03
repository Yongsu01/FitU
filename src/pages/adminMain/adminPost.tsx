import React, { useState } from "react";
import styled from "styled-components";
import AdminHeader from "../../components/adminHeader/adminHeader";
import SchoolSearch from "../../components/adminSearch/adminSearchSchool";

const AdminMember: React.FC = () => {
  const [active, setActive] = useState<"request" | "post" | "member">("post");
  const [selectedSchool, setSelectedSchool] = useState("");

  return (
    <>
      <AdminHeader active={active} setActive={setActive} />

      <Member>
        <SchoolSearch onSchoolSelect={setSelectedSchool} />
      </Member>

      <Selected>{selectedSchool}</Selected>
    </>
  );
};

export default AdminMember;

const Member = styled.div``;
const Selected = styled.div``;
