const UserMessage = ({ message }) => {
  return (
    <div className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px] items-start gap-[10px] user-message">
      <p className="font-Metropolis user-message-text">{message}</p>
    </div>
  );
};

export default UserMessage;
