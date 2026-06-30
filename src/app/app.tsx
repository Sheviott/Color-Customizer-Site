import { RouterProvider } from "react-router";
import { router } from "../routers/route";
// import { useEffect } from "react";
// import { useAppDispatch } from "@services/hooks";
// import { setItems,setColorPanel } from "@store/catalog/colorPickerSlice";
// import { fetchReleases } from "@store/catalog/catalogSlice";
// import { useEffect } from "react";

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
