import Image from 'next/image';

const ReceivedMessage = ({ message, showProfile }) => {
  console.log('creating blue message');
  return (
    <div className="flex gap-[16px] self-end">
      <Image
        alt="avatar"
        width={40}
        height={40}
        className={`h-10 w-10 rounded-xl object-cover object-center ${
          showProfile === undefined ? 'hidden' : ''
        }`}
        src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/0a16cb0e41db33331f39452bcb2488e5873e3a3e.webp"
      />
      <div
        className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px]
      items-start gap-[10px] received-message w-fit "
      >
        <p className="font-Metropolis-SemiBold received-message-text">{message}</p>
      </div>
    </div>
  );
};

export default ReceivedMessage;
