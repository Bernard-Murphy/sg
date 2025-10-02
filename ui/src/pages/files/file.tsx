import { useParams } from "react-router-dom";

export interface FileProps {}

export default function File({}: FileProps) {
  const params = useParams();
  return <div>file {params.file}</div>;
}
