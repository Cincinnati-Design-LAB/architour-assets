export const UploadButton = () => {
  return (
    <>
      <input type="file" id="_image-file" className="hidden" />
      <button id="_upload-trigger" className="inline-block px-6 py-2 text-white bg-blue-500">
        Upload New Image
      </button>
    </>
  );
};
