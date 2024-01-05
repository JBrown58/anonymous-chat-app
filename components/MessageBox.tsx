import { FaPaperclip } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { IoIosSend } from 'react-icons/io';
import { io, connect } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3001/');

const MessageBox = () => {
  const [value, setValue] = useState('');
  const room = 'room1';
  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('send_message', { value, room });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-[24px] items-center gap-[24px] self-stretch fixed bottom-0 w-[100%]">
        <FaPaperclip className="attachments-icon" />
        <div className="flex justify-end items-center relative w-[100%]">
          <button type="submit" className="absolute mr-2 w-10 send-icon">
            <IoIosSend />
          </button>
          <Input
            className="border border-gray-400 rounded-lg p-4 w-full"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
        </div>
      </div>
    </form>
  );
};

export default MessageBox;
