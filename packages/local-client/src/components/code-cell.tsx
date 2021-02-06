
import React, { useEffect, useCallback } from 'react';
import CodeEditor from "./code-editor";
import Preview from './preview';
import Resizable from './resizable'
import {Cell} from "../state";
import {useActions} from "../hooks/use-actions";
import {useTypedSelector} from "../hooks/use-typed-selector";
import {useCumulativeCode} from "../hooks/use-cumulative-code";
import './code-cell.css';

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {

  const {updateCell, createBundle} = useActions();
  const bundle = useTypedSelector(({bundles}) => bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id);

  const bundleCode = useCallback(async (value: string): Promise<void> => {
    createBundle(cell.id, value)
  }, [cell.id, createBundle]);

  useEffect(() => {
    if (!bundle) {
      bundleCode(cumulativeCode);
      return;
    }
    const timer = setTimeout(() => {
      bundleCode(cumulativeCode)
    } , 1000)
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, bundleCode])

  return (
      <Resizable direction='vertical'>
        <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row"}}>
          <Resizable direction='horizontal'>
            <CodeEditor initialValue={""} onChange={(value:string) => updateCell(cell.id,value)}/>
          </Resizable >
          <div className="progress-wrapper">
            {
              !bundle || bundle.loading
                  ?
                  <div className="progress-cover">
                    <progress className="progress is-small is-primary" max="100">
                      Loading
                    </progress>
                  </div>
                  : <Preview bundlingError={bundle.err} code={bundle.code} />
            }
          </div>
        </div>
      </Resizable>
  );
};


export default CodeCell;



// import './code-cell.css';
// import { useEffect } from 'react';
// import CodeEditor from './code-editor';
// import Preview from './preview';
// import Resizable from './resizable';
// import { Cell } from '../state';
// import { useActions } from '../hooks/use-actions';
// import { useTypedSelector } from '../hooks/use-typed-selector';
// import { useCumulativeCode } from '../hooks/use-cumulative-code';
//
// interface CodeCellProps {
//   cell: Cell;
// }
//
// const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
//   const { updateCell, createBundle } = useActions();
//   const bundle = useTypedSelector((state) => state.bundles[cell.id]);
//   const cumulativeCode = useCumulativeCode(cell.id);
//
//   useEffect(() => {
//     if (!bundle) {
//       createBundle(cell.id, cumulativeCode);
//       return;
//     }
//
//     const timer = setTimeout(async () => {
//       createBundle(cell.id, cumulativeCode);
//     }, 750);
//
//     return () => {
//       clearTimeout(timer);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cumulativeCode, cell.id, createBundle]);
//
//   return (
//     <Resizable direction="vertical">
//       <div
//         style={{
//           height: 'calc(100% - 10px)',
//           display: 'flex',
//           flexDirection: 'row',
//         }}
//       >
//         <Resizable direction="horizontal">
//           <CodeEditor
//             initialValue={""}
//             onChange={(value: string) => updateCell(cell.id, value)}
//           />
//         </Resizable>
//         <div className="progress-wrapper">
//           {!bundle || bundle.loading ? (
//             <div className="progress-cover">
//               <progress className="progress is-small is-primary" max="100">
//                 Loading
//               </progress>
//             </div>
//           ) : (
//             <Preview code={bundle.code} err={bundle.err} />
//           )}
//         </div>
//       </div>
//     </Resizable>
//   );
// };
//
// export default CodeCell;
