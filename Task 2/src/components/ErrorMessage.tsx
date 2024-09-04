import { MdError } from "react-icons/md";

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center text-red-600 bg-red-100 border border-red-300 rounded p-3 mt-2">
    <MdError className="text-xl mr-2" />
    <span className="text-sm font-semibold">{message}</span>
  </div>
);
