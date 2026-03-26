import React from 'react';
import styled from 'styled-components';

export interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  profileImage: string;
}

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  onRoomClick: (roomId: number) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms, onRoomClick }) => {
  if (chatRooms.length === 0) {
    return <EmptyMessage>진행 중인 채팅이 없습니다.</EmptyMessage>;
  }

  return (
    <ListContainer>
      {chatRooms.map((room) => (
        <RoomItem key={room.id} onClick={() => onRoomClick(room.id)}>
          <ProfileImage src={room.profileImage} alt={room.name} />
          <RoomInfo>
            <RoomName>{room.name}</RoomName>
            <LastMessage>{room.lastMessage}</LastMessage>
          </RoomInfo>
        </RoomItem>
      ))}
    </ListContainer>
  );
};

export default ChatRoomList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #fafafa;
  }
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 1px solid #eee;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  overflow: hidden;
`;

const RoomName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
`;

const LastMessage = styled.div`
  font-size: 13px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyMessage = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
`;