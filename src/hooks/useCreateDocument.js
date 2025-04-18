import { useMutation } from "react-query";
import { createDocument } from "../api/createDocument";

export const useCreateDocument = () => {
  // const queryClient = useQueryClient();
  return useMutation("document", createDocument, {
    // onSuccess: (res) => {
    //   // console.log("Post created successfully", res);
    //   // here we will invalidate the documents list in the future
    //   // queryClient.invalidateQueries("posts");
    // },
  });
};
