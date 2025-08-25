

# Nodewave Frontend Technical Test

This is a Frontend Engineer test application for Nodewave.

## How to Run

1. **Install dependencies:**

	```bash
	npm install
	# or
	yarn install
	```

2. **Set environment variable:**

	Create a `.env.local` file in the project root, then fill in:

	```env
	NEXT_PUBLIC_API_URL=https://the-base-url-provided-in-the-test
	# Example: NEXT_PUBLIC_API_URL=https://api.nodewave.com
	```

	Change it according to the backend base url provided in the test instructions.

3. **Run the development server:**

	```bash
	npm run dev
	# or
	yarn dev
	```

4. **Access the app:**

	Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Notes

- This app uses Next.js App Router, Zustand, TanStack React Query, and shadcn/ui.
- All FE API endpoints will forward requests to the backend according to the base url you set in the env.
- Main features: Auth (login/register), todo CRUD, token verification, etc.

---

