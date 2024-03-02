function Table({ sentence, selectedWords, handleWordClick }) {
  return (
    <tr key={sentence.id}>
      <td>{sentence.id + 1}</td>
      {sentence.sentence.map((word, index) => (
        <td
          className={`${
            selectedWords[sentence.id] && selectedWords[sentence.id].includes(index)
              ? 'highlight'
              : 'not_highlight'
          }`}
          key={index}
          onClick={() => handleWordClick(sentence.id, index)}>
          {word.text}&nbsp;
        </td>
      ))}
    </tr>
  );
}

export default Table;
