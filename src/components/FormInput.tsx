interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ label, type = "text", value, onChange }: FormInputProps) {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "0.3rem", fontWeight: "bold" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #ccc" }}
      />
    </div>
  );
}
