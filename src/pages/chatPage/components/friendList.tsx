import React from 'react';
import styled from 'styled-components';
import defaultImage from '../../../assets/images/default_profileImage.png';

export interface Friend {
  id: number;
  name: string;
  profileImage: string;
}

interface FriendListProps {
  friends: Friend[];
  onFriendClick: (id: number, name: string) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onFriendClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  if (friends.length === 0) {
    return <EmptyMessage>친구가 없습니다.</EmptyMessage>;
  }

  return (
    <ListContainer>
      {friends.map((friend) => (
        <FriendItem key={friend.id} onClick={() => onFriendClick(friend.id, friend.name)}>
          <ProfileImage 
            src={friend.profileImage || defaultImage} 
            alt={friend.name}
            onError={handleImageError}
          />
          <FriendName>{friend.name}</FriendName>
        </FriendItem>
      ))}
    </ListContainer>
  );
};

export default FriendList;

const ListContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  min-width: 60px; 
  flex-shrink: 0; 
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
  border: 1px solid #eee;
  background-color: #f0f0f0;
`;

const FriendName = styled.span`
  font-size: 13px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #888;
  font-size: 14px;
  width: 100%;
`;