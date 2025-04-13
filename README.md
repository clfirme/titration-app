# Acid-Base Titration Calculator

This Next.js application visualizes acid-base titration curves for three different scenarios involving NaOH and HCl solutions. The application allows users to select between different titration scenarios and view the corresponding pH curve as acid is added to the base solution.

## Features

- Interactive titration curve visualization
- Three different titration scenarios:
  - 50 mL of 6M NaOH titrated with 6M HCl
  - 50 mL of 3M NaOH titrated with 6M HCl
  - 50 mL of 6M NaOH titrated with 3M HCl
- Detailed information about each titration, including equivalence point
- Educational content about acid-base titrations
- Responsive design that works on mobile and desktop

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 14.x or higher recommended).

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/acid-base-titration-calculator.git
   cd acid-base-titration-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app`: Main application pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility functions and calculation logic
- `/public`: Static assets

## How It Works

The application uses a mathematical model to calculate pH values at different points during the titration process. The calculation takes into account:

- Initial volume and concentration of the base (NaOH)
- Concentration of the acid (HCl)
- Volume of acid added at each point
- Total solution volume

The pH is calculated differently based on whether the titration is before, at, or after the equivalence point:

- Before equivalence point: pH based on excess OH- concentration
- At equivalence point: pH = 7 (neutral)
- After equivalence point: pH based on excess H+ concentration

## Technologies Used

- Next.js - React framework
- Recharts - Chart library
- TailwindCSS - Styling

## Future Enhancements

- Add weak acid-strong base titration scenarios
- Add weak base-strong acid titration scenarios
- Add buffer solution titrations
- Add ability for users to input custom concentrations
- Add interactive features like dragging points on the curve
- Add pH indicator color visualization

## License

This project is licensed under the MIT License.