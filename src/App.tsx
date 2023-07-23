import { CopyBlock, monokaiSublime } from "react-code-blocks";
import { type Item } from "./assets/types";
import { flattenItems } from "./assets/utils";
import { dotNetSnippets } from "./assets/dotnet";

type TableOfContentsProps = { items: Item[] };
const TableOfContents = ({ items }: TableOfContentsProps) => {
  return (
    <div className="flex flex-col mb-20">
      <h1 className="font-bold text-slate-400 pb-4">Table of Contents</h1>
      {items.map((item) => {
        const itemIndent = `ms-${item.indent}`;
        return (
          <a className={`${itemIndent} text-slate-200`} href={`#${item.id}`} key={item.id}>
            {item.heading}
          </a>
        );
      })}
    </div>
  );
};

const produceItem = (obj: Item) => {
  const gapBottom = `pb-${obj.gapBottom ?? 1}`;
  const gapTop = `pt-${obj.gapTop ?? 1}`;
  const fontSize = obj.fontSize ?? "";
  return (
    <div className={`ms-${obj.indent} my-4 ${gapTop} ${gapBottom} ${fontSize}`}>
      <div id={obj.id} className="font-semibold">
        {obj.heading}
      </div>
      {obj.description && <div className="py-2 mb-4">{obj.description}</div>}
      {obj.snippet !== undefined && (
        <div className="border border-gray-50 mb-4">
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
          />{" "}
        </div>
      )}
      {obj.separator == true && <div className="border border-b border-slate-400"></div>}
    </div>
  );
};

function App() {
  const items = flattenItems(dotNetSnippets);
  return (
    <>
      <TableOfContents items={items} />
      {items.map((item) => produceItem(item))}
    </>
  );
}

export default App;
