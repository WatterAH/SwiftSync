export const Message = ({ setMessage, message, handleTyping }) => {
  return (
    <div>
      <div className="flex items-center gap-4 justify-center">
        <input
          type="text"
          placeholder="Write something..."
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 rounded-md w-5/6 text-black"
          onKeyUp={handleTyping}
          value={message}
        />
        <div>
          <button className="rounded-md bg-amber-400 p-3 w-16 md:w-32">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
