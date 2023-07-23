import { CopyBlock, monokaiSublime } from "react-code-blocks";
import { type Item } from "./assets/types";
import { flattenItems } from "./assets/utils";
import { dotNetSnippets } from "./assets/dotnet";

type TableOfContentsProps = { items: Item[] };
const TableOfContents = ({ items }: TableOfContentsProps) => {
  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const itemIndent = `ms-${item.indent}`;
        return (
          <a className={`${itemIndent}`} href={`#${item.id}`}>
            {item.heading}
          </a>
        );
      })}
    </div>
  );
};

const produceItem = (obj: Item) => {
  return (
    <div className={`ms-${obj.indent} my-4`}>
      <div id={obj.id} className="font-semibold">
        {obj.heading}
      </div>
      {obj.description && <div>{obj.description}</div>}
      {obj.snippet !== undefined && (
        <CopyBlock
          text={obj.snippet.code ?? ""}
          language={obj.snippet.language}
          showLineNumbers={true}
          startingLineNumber={0}
          wrapLongLines={false}
          codeBlock={true}
          copied={false}
          theme={{ ...monokaiSublime, mode: "light" }}
          onCopy={() => void {}}
        />
      )}
    </div>
  );
};

function App() {
  const items = flattenItems(dotNetSnippets);
  return (
    <>
      <input type="search"></input>
      <TableOfContents items={items} />
      {items.map((item) => produceItem(item))}
    </>
  );
}

export default App;
