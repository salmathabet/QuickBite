import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password, name.trim());

    if (error) {
      setError(error.message);
    } else if (!isLogin) {
      setMessage("تم إنشاء الحساب. لو طُلب منك تأكيد الإيميل، افتحي بريدك.");
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
      </h2>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="الإيميل"
        className="w-full border rounded-lg p-2 mb-3"
      />
      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="الباسورد (6 حروف على الأقل)"
        className="w-full border rounded-lg p-2 mb-3"
      />

      {!isLogin && (
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم"
          className="w-full border rounded-lg p-2 mb-3"
        />
      )}

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-orange-500 text-white rounded-lg p-2 disabled:opacity-50"
      >
        {submitting ? "..." : isLogin ? "دخول" : "إنشاء حساب"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        {isLogin ? "معندكيش حساب؟" : "عندك حساب؟"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-orange-500 underline"
        >
          {isLogin ? "سجّلي" : "ادخلي"}
        </button>
      </p>
    </form>
  );
}

export default AuthForm;