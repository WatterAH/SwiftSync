import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InputMessage = ({ setMessage, message }) => {
  return (
    <div>
      <div className="flex items-center gap-4 justify-center">
        <input
          type="text"
          placeholder="Write something..."
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 rounded-md w-5/6 text-black"
          value={message}
        />
        <div>
          <button className="rounded-md bg-amber-400 p-3 w-24 md:w-32">
            Send
            <FontAwesomeIcon
              className="ml-3"
              icon={faPaperPlane}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};
