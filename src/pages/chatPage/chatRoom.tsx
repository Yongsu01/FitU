import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import BackButton from "../../components/BackButton";
import SendIcon from "../../assets/images/Send.svg";
import axiosInstance from '../../apis/axiosInstance';
import DefaultProfile from "../../assets/images/default_profileImage.png";

const SERVER_SOCKET_URL = 'http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/ws';

interface Message {
  id: number | string;
  text: string;
  sender: 'me' | 'other';
  senderName: string;
  senderProfile: string;
  time?: string;
}

interface ServerHistoryItem {
  senderName: string;
  message: string;
  senderProfileUrl: string;
  sendTime: string;
  senderId: number; 
}

interface HistoryResponse {
  messages: ServerHistoryItem[];
}

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  const stompClient = useRef<Client | null>(null);
  
  const myName = sessionStorage.getItem("userName") || "나"; 
  const myUserId = sessionStorage.getItem("userid");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!roomId) return;
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const response = await axiosInstance.get<HistoryResponse>(`/api/v2/chat/message/${roomId}`, {
           headers: { Authorization: token }
        });
        
        const historyData = response.data.messages.map((item, index) => {
          let isMe = false;
          
          if (myUserId && item.senderId !== undefined) {
             isMe = String(item.senderId) === String(myUserId);
          } else {
             isMe = item.senderName === myName;
          }

          return {
            id: `history-${index}-${item.sendTime}`,
            text: item.message,
            sender: isMe ? 'me' : 'other',
            senderName: item.senderName,
            senderProfile: item.senderProfileUrl || DefaultProfile,
            time: item.sendTime
          } as Message;
        });
        
        setMessages(historyData); 

      } catch (error) {
        console.error("채팅 내역 조회 실패:", error);
      }
    };

    fetchHistory();
  }, [roomId, myName, myUserId]);

  useEffect(() => {
    const token = sessionStorage.getItem("Authorization");

    if (!roomId || !token) {
      console.error("오류");
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(SERVER_SOCKET_URL),
      
      connectHeaders: {
        Authorization: token, 
      },
      
      onConnect: () => {
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          if (message.body) {
            try {
              const receivedMsg = JSON.parse(message.body);
              
              let isMe = false;
              if (myUserId && receivedMsg.senderId) {
                 isMe = String(receivedMsg.senderId) === String(myUserId);
              } else {
                 isMe = receivedMsg.sender === myName;
              }

              const newMessage: Message = {
                id: Date.now(),
                text: receivedMsg.message,
                sender: isMe ? 'me' : 'other',
                senderName: receivedMsg.senderName || receivedMsg.sender || "알 수 없음",
                senderProfile: receivedMsg.senderProfileUrl || DefaultProfile, 
              };
              
              setMessages((prev) => [...prev, newMessage]);
            } catch (err) {
              console.error("에러:", err);
            }
          }
        });
      },

      reconnectDelay: 5000,
    });

    client.activate();
    stompClient.current = client;

    return () => {
      if (client.active) client.deactivate();
    };
  }, [roomId, myName, myUserId]);

  const handleSendMessage = () => {
    if (!input.trim() || !stompClient.current?.connected) return;

    const payload = {
      roomId: Number(roomId),
      message: input,
      type: 'TEXT',
      sender: myName,
      senderId: myUserId
    };

    stompClient.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify(payload),
    });

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSendMessage();
    }
  };

  return (
    <PageContainer>
      <ChatHeader>
        <BackButton>채팅방</BackButton>
      </ChatHeader>

      <MessageArea>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <MessageRow key={msg.id || index} $isMine={msg.sender === 'me'}>
              {msg.sender !== 'me' && (
                <ProfileWrapper>
                  <ProfileImg 
                    src={msg.senderProfile || DefaultProfile} 
                    alt={msg.senderName}
                    onError={(e) => { e.currentTarget.src = DefaultProfile; }}
                  />
                  <SenderName>{msg.senderName}</SenderName>
                </ProfileWrapper>
              )}
              
              <MessageBubble $isMine={msg.sender === 'me'}>
                {msg.text}
              </MessageBubble>
            </MessageRow>
          ))
        ) : (
          <EmptyState>대화 내용이 없습니다.</EmptyState>
        )}
      </MessageArea>

      <InputArea>
        <ChatInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지 입력하기" 
        />
        <SendButton onClick={handleSendMessage}>
          <img src={SendIcon} alt="전송" />
        </SendButton>
      </InputArea>
    </PageContainer>
  );
};

export default ChatRoom;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
`;
const ChatHeader = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
`;
const MessageArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const MessageRow = styled.div<{ $isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isMine ? 'flex-end' : 'flex-start')};
  width: 100%;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  margin-left: 4px;
`;
const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
  background-color: #f0f0f0;
`;
const SenderName = styled.span`
  font-size: 13px;
  color: #555;
`;
const MessageBubble = styled.div<{ $isMine: boolean }>`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  border-top-left-radius: ${(props) => (!props.$isMine ? '4px' : '16px')};
  border-top-right-radius: ${(props) => (props.$isMine ? '4px' : '16px')};
  font-size: 15px;
  background-color: ${(props) => (props.$isMine ? '#17A1FA' : '#f0f2f5')};
  color: ${(props) => (props.$isMine ? '#ffffff' : '#000000')};
  word-break: break-word;
  line-height: 1.4;
`;
const InputArea = styled.footer`
  display: flex;
  align-items: center;
  padding: 10px 16px 20px 16px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
`;
const ChatInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 20px;
  background-color: #f0f2f5;
  font-size: 15px;
  &:focus { outline: none; }
  &::placeholder { color: #999; }
`;
const SendButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EmptyState = styled.div`
  text-align: center;
  color: #999;
  margin-top: 50px;
  font-size: 14px;
`;