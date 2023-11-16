import { ReactNode } from "react";
import style from './Dashboard.module.css'

interface Props {
  term: string;
  children?: ReactNode;
}

const StatusRow = ({ term, children }: Props) => {
  return (
    <>
          <div className="col-md">
            <div className="card text-center text-dark  mb-3" id="total-dept">
              <div className="card-header">
                <h5 className={`card-title ${style.termcss}`}>{term}</h5>
              </div>
              <div className="card-body">
                <h3 className="card-title">{children}</h3>
              </div>
            </div>
          </div>
    </>
  );
};

export default StatusRow;
