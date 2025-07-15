import DropDown from "./components/DropDown";
import LeaderBoard from "./components/LeaderBoard";
// import { ToastContainer, toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="h-screen w-screen overflow-hidden bg-[#0f1c1b] flex flex-col md:flex-row items-start justify-center gap-10 p-8">
        <DropDown />
        <LeaderBoard />
      </div>
    </>

  );
};

export default App;
