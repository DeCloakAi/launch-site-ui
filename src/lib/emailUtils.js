export async function isDisposableEmail(email) {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@').pop().toLowerCase();

  try {
    const res = await fetch(`https://open.kickbox.com/v1/disposable/${domain}`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.disposable === true;
  } catch (err) {
    console.error('Disposable email check failed:', err);
    return false;
  }
}
