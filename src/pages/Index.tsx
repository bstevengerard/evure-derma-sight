// Redirect to AnalyzePage - homepage is AnalyzePage now
import { Navigate } from "react-router-dom";

const Index = () => {
  return <Navigate to="/analyze" replace />;
};

export default Index;

