function FileUpload({ handleFileUpload }) {
  return <input type="file" accept=".csv" onChange={handleFileUpload} />;
}

export default FileUpload;
