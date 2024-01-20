/* eslint-disable react/prop-types */
const DeletePopup = (props) => {
  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="add-product-window absolute left-[50%] top-[50%] h-max max-w-[1000px] -translate-x-[50%] -translate-y-[50%] rounded-lg border bg-white">
        <div className="top_row flex flex-col items-center justify-between gap-3 border-b px-12 py-5">
          <h2 className="text-xl font-semibold">
            Are you sure deleting this product??
          </h2>
          <div className="buttons flex gap-5">
            <button
              className="rounded-lg bg-amber-500 px-5 py-2 text-sm text-white hover:bg-amber-600"
              onClick={() => props.handleDeletePopupClick()}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 text-sm text-white hover:bg-rose-600"
              onClick={() => props.handleDelete()}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
