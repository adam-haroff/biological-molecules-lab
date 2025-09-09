# Biological Molecules Interactive Lab - Technical Specifications

## Project Overview

An educational interactive web application for chemistry students to learn about biological molecules by building molecular structures through drag-and-drop interactions. The lab covers three main procedures focusing on different types of molecules with increasing complexity.

## Repository Information
- **GitHub Repository**: https://github.com/adam-haroff/biological-molecules-lab
- **Technology Stack**: HTML5, CSS3, JavaScript (Vanilla)
- **Target Audience**: Chemistry students (CHE 1351 level)

## Learning Objectives

Students will be able to:
1. Identify correct bond shapes for simple molecules
2. Place atoms in appropriate positions to form molecular structures
3. Understand the progression from simple molecules to amino acids to carbohydrates
4. Build complex molecules through synthesis steps (dipeptides, disaccharides)

## User Interface Structure

### Layout Components

1. **Header Section**
   - Lab title: "BIOLOGICAL MOLECULES"
   - Information button with help/about functionality

2. **Left Sidebar**
   - **Procedure Navigation**: 3 numbered buttons (1, 2, 3)
   - **Instructions Panel**: Step-by-step procedural text
   - **Molecules List**: Clickable list of molecules for current procedure

3. **Main Workspace**
   - **Molecule Display Area**: Shows bond shapes and molecular structures
   - **Atoms Palette**: Draggable atom buttons (H, O, C, N)

### Visual Design Requirements

- **Color Scheme**: Professional chemistry lab aesthetic
  - Primary: Deep blue/navy (#2c3e50)
  - Secondary: Light blue/cyan accents
  - Success: Green checkmarks for completion
  - Warning: Orange/yellow for hints

- **Typography**: Clean, readable sans-serif fonts
- **Responsive Design**: Must work on tablets and desktop displays
- **Accessibility**: Full ARIA labels and keyboard navigation support

## Three-Procedure Learning Progression

### Procedure 1: Simple Molecules
**Focus**: Bond shape recognition and basic atom placement

**Molecules**:
1. **Water (H₂O)** - Bent molecular geometry
2. **Oxygen (O₂)** - Linear molecular geometry  
3. **Methane (CH₄)** - Tetrahedral molecular geometry
4. **Carbon Dioxide (CO₂)** - Linear molecular geometry

**User Flow**:
1. Student selects correct bond shape from 2×2 grid
2. Student drags atoms from palette to drop zones
3. Atoms snap into place when correctly positioned
4. Checkmark appears when molecule is complete
5. "Next" button appears to proceed

### Procedure 2: Amino Acids
**Focus**: More complex organic molecules and synthesis

**Molecules**:
1. **Glycine (C₂H₅NO₂)** - Simplest amino acid
2. **Alanine (C₃H₇NO₂)** - Amino acid with methyl side chain
3. **Dipeptide (C₅H₁₀N₂O₃)** - Synthesis of glycine + alanine

**User Flow**:
1. Single large bond shape displayed (no grid selection)
2. More complex atom placement with multiple carbons
3. Synthesis step for dipeptide formation
4. Visual representation of peptide bond formation

### Procedure 3: Carbohydrates
**Focus**: Sugar molecules and disaccharide synthesis

**Molecules**:
1. **Glucose (C₆H₁₂O₆)** - Ring structure monosaccharide
2. **Fructose (C₆H₁₂O₆)** - Isomer of glucose
3. **Sucrose (C₁₂H₂₂O₁₁)** - Disaccharide (glucose + fructose)
4. **Maltose (C₁₂H₂₂O₁₁)** - Disaccharide (glucose + glucose)

**User Flow**:
1. Complex ring structures for monosaccharides
2. Synthesis animations for disaccharide formation
3. Visual representation of glycosidic bond formation

## Technical Implementation Requirements

### Core Technologies
- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Grid/Flexbox layouts, transitions, responsive design
- **Vanilla JavaScript**: No external dependencies required
- **SVG**: Scalable molecular structure graphics

### Key Features

#### Drag and Drop System
- Native HTML5 drag and drop API
- Touch support for mobile/tablet devices
- Visual feedback during drag operations
- Snap-to-position functionality
- Validation of correct atom placement

#### State Management
```javascript
// Example state structure
const labState = {
    currentProcedure: 0,        // 0, 1, or 2
    currentMolecule: 'water',   // Current active molecule
    completedMolecules: Set(),  // Track completion
    moleculeSteps: {            // Track progress per molecule
        'water': 'bond-shape',  // 'bond-shape' | 'atom-placement' | 'complete'
        // ... other molecules
    }
}
```

#### Molecule Data Structure
```javascript
const molecules = {
    procedure1: [
        {
            id: 'water',
            name: 'Water',
            formula: 'H₂O',
            bondShape: 'bent',
            atoms: [
                { type: 'O', x: 67.96, y: 22 },
                { type: 'H', x: 16, y: 52 },
                { type: 'H', x: 119.92, y: 52 }
            ],
            svgTemplate: 'bond-shape-water'
        },
        // ... other molecules
    ]
}
```

### File Structure
```
biological-molecules-lab/
├── index.html              # Main application entry point
├── styles.css              # All CSS styling
├── app.js                  # Core application logic
├── README.md               # Project documentation
├── assets/                 # SVG molecular structures
│   ├── shape-water.svg
│   ├── shape-oxygen.svg
│   ├── shape-methane.svg
│   ├── shape-carbon-dioxide.svg
│   ├── shape-glycine.svg
│   ├── shape-alanine.svg
│   ├── shape-glucose.svg
│   └── shape-fructose.svg
└── docs/                   # Additional documentation
    └── storyboard/         # Reference images
```

### Performance Requirements
- **Load Time**: < 2 seconds on broadband connection
- **Smooth Animations**: 60fps transitions and drag operations
- **Memory Usage**: Minimal DOM manipulation, efficient event handling
- **Cross-Browser**: Support for Chrome, Firefox, Safari, Edge

### Accessibility Requirements
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**: Full lab functionality without mouse
- **Screen Reader Support**: Comprehensive ARIA labels
- **High Contrast**: Readable in high contrast modes
- **Focus Management**: Clear visual focus indicators

## Content Requirements

### Instructional Text
- Clear, concise step-by-step instructions
- Age-appropriate language for college chemistry level
- Contextual hints when students make errors
- Success messages for completed molecules

### Visual Assets
- **SVG Format**: All molecular structures as scalable vectors
- **Atom Representations**: Standard color coding (H=white, O=red, C=black, N=blue)
- **Bond Lines**: Clear visual representation of molecular bonds
- **Drop Zones**: Subtle visual indicators for atom placement

### Interactive Feedback
- **Success States**: Green checkmarks, positive reinforcement
- **Error Handling**: Gentle guidance, no harsh error messages
- **Progress Tracking**: Visual indicators of completion status
- **Hints System**: Optional help for struggling students

## Development Phases

### Phase 1: Core Framework (Week 1)
- [ ] Set up basic HTML structure and CSS layout
- [ ] Implement procedure navigation system
- [ ] Create molecule list rendering
- [ ] Basic drag and drop functionality

### Phase 2: Procedure 1 Implementation (Week 2)
- [ ] Bond shape selection grid
- [ ] Simple molecule atom placement
- [ ] Completion detection and progression
- [ ] SVG integration for molecular structures

### Phase 3: Advanced Procedures (Week 3)
- [ ] Implement procedures 2 and 3
- [ ] Synthesis step functionality
- [ ] Complex molecular structures
- [ ] Animation systems

### Phase 4: Polish and Testing (Week 4)
- [ ] Accessibility testing and improvements
- [ ] Cross-browser compatibility testing
- [ ] Performance optimization
- [ ] User experience refinements

## Quality Assurance

### Testing Requirements
- **Unit Testing**: Core functionality validation
- **Integration Testing**: Full user workflow testing
- **Accessibility Testing**: Screen reader and keyboard navigation
- **Performance Testing**: Load times and animation smoothness
- **Device Testing**: Various screen sizes and touch interfaces

### Browser Support Matrix
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Deployment Requirements

### Hosting
- Static file hosting (GitHub Pages, Netlify, or similar)
- HTTPS enabled
- Global CDN for performance

### Analytics (Optional)
- Basic usage tracking
- Completion rate monitoring
- Error rate tracking

## Future Enhancements

### Potential Additions
- **Progress Saving**: Local storage for session persistence
- **Multiple Themes**: Visual customization options
- **Audio Feedback**: Sound effects for interactions
- **Extended Molecules**: Additional molecular types
- **Assessment Mode**: Timed challenges and scoring
- **Instructor Dashboard**: Progress tracking for educators

This specification provides a comprehensive foundation for developing the biological molecules interactive lab. The implementation should prioritize educational value, accessibility, and user experience while maintaining clean, maintainable code.
