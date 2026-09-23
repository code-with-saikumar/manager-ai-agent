import UploadBox from "../components/UploadBox"

import Login from "./Login"
export default function UploadPage() {
    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to upload project plans.</p>
                <Login />
            </div>
        )
    }
  return (
    <div>

      <h1 style={{ textAlign: "center" }}>
        Upload Requirements PDF
      </h1>

      <UploadBox />

    </div>
  )
}
