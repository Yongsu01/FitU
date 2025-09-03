import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/images/Search.png";

interface SchoolSearchProps {
  onSchoolSelect: (school: string) => void;
}

const SchoolSearch: React.FC<SchoolSearchProps> = ({ onSchoolSelect }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dummySchools = [
      "한세대학교",
      "가대학교",
      "가나대학교",
      "다대학교",
      "라대학교",
    ];
    const filtered = dummySchools.filter((school) => school.includes(keyword));
    setResults(filtered);

    if (
      keyword.trim() === "" ||
      (filtered.length === 1 && filtered[0] === keyword)
    ) {
      setOpen(false);
    } else {
      setOpen(filtered.length > 0);
    }
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (school: string) => {
    setKeyword(school);
    setOpen(false);
    onSchoolSelect(school);
  };

  const handleSearch = () => {
    console.log("검색 실행:", keyword);
  };

  return (
    <SearchContainer ref={containerRef}>
      <SearchBar>
        <Input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="학교명을 입력해주세요"
        />
        <SearchButton onClick={handleSearch}>
          <Icon src={searchIcon} alt="검색" />
        </SearchButton>
      </SearchBar>

      {open && results.length > 0 && (
        <Dropdown>
          {results.map((school, idx) => (
            <DropdownItem key={idx} onClick={() => handleSelect(school)}>
              {school}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SearchContainer>
  );
};

export default SchoolSearch;

const SearchContainer = styled.div`
  position: relative;
  margin-left: 357px;
`;

const SearchBar = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: 16px;
  border: none;
  font-size: 18px;
  outline: none;

  &::placeholder {
    color: #abb5bd;
    font-weight: 350;
  }
`;

const SearchButton = styled.button`
  padding: 0 16px;
  border: none;
  background: #fff;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const Dropdown = styled.ul`
  position: flex;
  width: 283px;
  background: #fff;
  border: 1px solid #eaebef;
  border-radius: 4px;
  margin: 2px 0 0 0;
  padding: 0;
  z-index: 10;
  max-height: 160px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
