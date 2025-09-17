export default function Base() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-text-primary mb-2">Welcome to Eyes0n</p>
        <p className="text-text-secondary mb-4">
          Below is a demonstration of our theme components:
        </p>
      </div>

      {/* DEBUG: Color Test Section */}
      <div className="space-y-4 border-2 border-red-500 p-4">
        <h2 className="text-text-primary text-lg font-semibold">
          🐛 DEBUG: Color Test
        </h2>
        <div className="space-y-2">
          <p className="text-white">White text (should be visible)</p>
          <div className="flex gap-4">
            <button
              className="bg-button-primary text-white px-4 py-2 rounded"
              style={{ backgroundColor: "#3700B3" }}
            >
              Inline Purple (#3700B3)
            </button>
            <button className="bg-button-primary text-white px-4 py-2 rounded">
              Tailwind bg-button-primary
            </button>
          </div>
          <div className="flex gap-4">
            <div
              style={{
                backgroundColor: "#6200EE",
                color: "white",
                padding: "8px",
              }}
            >
              Inline #6200EE
            </div>
            <div className="bg-button-secondary text-white p-2">
              Tailwind bg-button-secondary
            </div>
          </div>
        </div>
      </div>

      {/* Background Color Demonstration */}
      <div className="space-y-4">
        <h2 className="text-text-primary text-lg font-semibold">
          Background Colors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-primary p-4 rounded-lg border border-background-tertiary">
            <p className="text-text-primary text-sm">Primary Background</p>
            <p className="text-text-secondary text-xs">#121212</p>
          </div>
          <div className="bg-background-secondary p-4 rounded-lg border border-background-tertiary">
            <p className="text-text-primary text-sm">Secondary Background</p>
            <p className="text-text-secondary text-xs">#1E1E1E</p>
          </div>
          <div className="bg-background-tertiary p-4 rounded-lg border border-background-tertiary">
            <p className="text-text-primary text-sm">Tertiary Background</p>
            <p className="text-text-secondary text-xs">#2D2D2D</p>
          </div>
        </div>
      </div>

      {/* Text Color Demonstration */}
      <div className="space-y-4">
        <h2 className="text-text-primary text-lg font-semibold">Text Colors</h2>
        <div className="space-y-2">
          <p className="text-text-primary">Primary Text (#FFFFFF)</p>
          <p className="text-text-secondary">Secondary Text (#E1E1E1)</p>
          <p className="text-text-tertiary">Tertiary Text (#A0A0A0)</p>
        </div>
      </div>

      {/* Button Color Demonstration */}
      <div className="space-y-4">
        <h2 className="text-text-primary text-lg font-semibold">
          Button Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-button-primary text-text-primary px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
            Primary Button
          </button>
          <button className="bg-button-secondary text-text-primary px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
            Secondary Button
          </button>
          <button className="bg-button-tertiary text-background-primary px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
            Tertiary Button
          </button>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="space-y-4">
        <h2 className="text-text-primary text-lg font-semibold">
          Interactive Elements
        </h2>
        <div className="space-y-4">
          <div className="bg-background-secondary p-4 rounded-lg border border-background-tertiary">
            <h3 className="text-text-primary mb-2">Card Example</h3>
            <p className="text-text-secondary mb-4">
              This is a card with themed background and text colors.
            </p>
            <button className="bg-button-primary text-text-primary px-3 py-1 rounded text-sm">
              Action
            </button>
          </div>

          <div className="bg-background-primary p-4 rounded-lg border border-background-tertiary">
            <form className="space-y-3">
              <div>
                <label className="block text-text-secondary text-sm mb-1">
                  Input Example
                </label>
                <input
                  type="text"
                  placeholder="Type something..."
                  className="w-full bg-background-tertiary text-text-primary border border-background-tertiary rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-button-secondary"
                />
              </div>
              <button
                type="submit"
                className="bg-button-secondary text-text-primary px-4 py-2 rounded hover:bg-button-primary transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
