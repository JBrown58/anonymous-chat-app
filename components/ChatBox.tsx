import { Input } from '@/components/ui/input';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useState, useContext } from 'react';
import { ConnectionContext } from './ConnectionContext';

const ChatBox = ({ socket }) => {
  const [value, setValue] = useState('');
  const isConnected  = useContext(ConnectionContext)

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      sender: socket.id,
      message: value,
    };
    socket.emit('send_message', data);
    setValue('');
  };

  useEffect(() => {
    setValue('');
  }, [isConnected]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-[24px] items-center gap-[24px] self-stretch fixed bottom-0 w-[100%]" id='input-container'>
        <div className="flex justify-end items-center relative w-[100%]">
          {isConnected && (
            <button type="submit" className="absolute mr-2 w-10 send-icon" id="message-send-btn">
              <IoIosSend />
            </button>
          )}

          <Input
            className="border border-gray-400 rounded-lg p-4 w-full"
            onChange={e => setValue(e.target.value)}
            value={value}
            maxLength={75}
            required
            id="chat-input"
          />
        </div>
      </div>
    </form>
  );
};

export default ChatBox;
