/* eslint-disable react/prop-types */

const NotesItem = (props) => {
  return (
    <div className="notes_item">
      <h2 className="text-lg font-semibold text-blue-600">
        {/* {props.fullName}&apos;s notepad */}
        Notepad
      </h2>
      <textarea
        name="notepad"
        id="notepad"
        placeholder="Enter your notes here"
        className="outline:none mt-2 h-[300px] w-full resize-y rounded-lg border p-3 font-[300] focus:border-blue-600 focus:outline-none"
      ></textarea>
    </div>
  );
};

export default NotesItem;
