import { HiRichEditor } from './components/HiRichEditor';

const App = () => {
  const initialValue = [
    {
      "type": "code_block",
      "children": [
        {
          "id": "1",
          "type": "code_line",
          "children": [
            {
              "text": ""
            }
          ]
        }
      ],
      "id": "6z49p"
    },
    {
      id: '1',
      type: 'p',
      children: [
        { text: 'Hello, World! ' },
        { text: 'Bold, ', bold: true },
        { text: 'Italic ', italic: true },
      ],
    },
  ];
  return (

    <div className="content" style={{
      padding: '50px'
    }}>
      <HiRichEditor initialValue={initialValue} onChange={(val) => {
        console.log('Handle onChange: ', val);
      }}></HiRichEditor>
    </div>
  );
};

export default App;
