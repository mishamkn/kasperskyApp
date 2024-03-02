import { useState } from 'react';

import Table from './components/Table';
import FileUpload from './components/FileUpload';
import { Button } from 'antd';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedWords, setSelectedWords] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = () => {
      const lines = reader.result.split('\n');
      const parsedData = lines.map((line, index) => ({
        id: index,
        sentence: line.split(' ').map((word) => ({ text: word, selected: false })),
      }));
      setData(parsedData);
    };
  };

  const handleWordClick = (sentenceId, wordIndex) => {
    const newSelectedWords = { ...selectedWords };
    if (!newSelectedWords[sentenceId]) {
      newSelectedWords[sentenceId] = [];
    }
    if (newSelectedWords[sentenceId].includes(wordIndex)) {
      newSelectedWords[sentenceId] = newSelectedWords[sentenceId].filter(
        (index) => index !== wordIndex,
      );
    } else {
      newSelectedWords[sentenceId].push(wordIndex);
    }
    setSelectedWords(newSelectedWords);
  };

  const handleSave = () => {
    let savedData = data.map((sentence) => {
      const selectedWordsInSentence = selectedWords[sentence.id] || [];
      return selectedWordsInSentence
        .map((index) => sentence.sentence[index].text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ''))
        .join('|');
    });

    savedData = savedData.filter((words) => words !== '');

    const blob = new Blob([savedData.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'selectedWords.txt';
    a.click();
  };

  return (
    <div>
      <FileUpload handleFileUpload={handleFileUpload} />

      <Button onClick={handleSave}>Save</Button>

      <table className="table">
        <tr>
          <td>Id</td>
          <td>Text</td>
        </tr>
        {data.map((sentence, idx) => {
          if (idx !== data.length - 1)
            return (
              <Table
                key={sentence.id}
                sentence={sentence}
                selectedWords={selectedWords}
                handleWordClick={handleWordClick}
              />
            );
        })}
      </table>
    </div>
  );
};

export default App;
