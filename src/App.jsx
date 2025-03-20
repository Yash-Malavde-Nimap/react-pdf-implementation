import PDF from "./components/PDF";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        // padding:'40px 0px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        background: "#262626",
      }}
    >
      
      <PDF />
    </div>
  );
};

export default App;
