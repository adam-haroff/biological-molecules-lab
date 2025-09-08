/**
 * Biological Molecules Interactive Lab
 * A comprehensive educational tool for learning molecular structures
 * through interactive drag-and-drop molecule building exercises.
 */

class BiologicalMoleculesLab {
    constructor() {
        this.currentProcedure = 1;
        this.currentMolecule = 'water';
        this.moleculeData = this.initializeMoleculeData();
        this.completedMolecules = new Set();
        
        this.init();
    }

    /**
     * Initialize the lab interface and event listeners
     */
    init() {
        this.setupEventListeners();
        this.updateDisplay();
        console.log('Biological Molecules Lab initialized');
    }

    /**
     * Define the molecular data for all procedures
     */
    initializeMoleculeData() {
        return {
            // Procedure 1: Simple molecules
            1: {
                water: {
                    name: 'Water',
                    formula: 'H₂O',
                    atoms: { H: 2, O: 1 },
                    structure: 'simple',
                    instructions: [
                        'Place one oxygen atom in the center',
                        'Add two hydrogen atoms',
                        'Hydrogen atoms should bond to oxygen at an angle'
                    ]
                },
                'carbon-dioxide': {
                    name: 'Carbon Dioxide',
                    formula: 'CO₂',
                    atoms: { C: 1, O: 2 },
                    structure: 'linear',
                    instructions: [
                        'Place carbon atom in the center',
                        'Add oxygen atoms on both sides',
                        'Molecule should be linear (straight line)'
                    ]
                },
                methane: {
                    name: 'Methane',
                    formula: 'CH₄',
                    atoms: { C: 1, H: 4 },
                    structure: 'tetrahedral',
                    instructions: [
                        'Place carbon atom in the center',
                        'Add four hydrogen atoms around carbon',
                        'Arrange in tetrahedral geometry'
                    ]
                }
            },
            // Procedure 2: Organic molecules
            2: {
                glucose: {
                    name: 'Glucose',
                    formula: 'C₆H₁₂O₆',
                    atoms: { C: 6, H: 12, O: 6 },
                    structure: 'complex',
                    instructions: [
                        'Start with a carbon chain (6 carbons)',
                        'Add hydroxyl groups (-OH) to carbons',
                        'Form the ring structure',
                        'Complete with remaining hydrogens'
                    ]
                },
                fructose: {
                    name: 'Fructose',
                    formula: 'C₆H₁₂O₆',
                    atoms: { C: 6, H: 12, O: 6 },
                    structure: 'complex',
                    instructions: [
                        'Build the five-membered ring structure',
                        'Add the ketone group at carbon 2',
                        'Attach hydroxyl groups',
                        'Complete the molecular structure'
                    ]
                }
            },
            // Procedure 3: Amino acids
            3: {
                glycine: {
                    name: 'Glycine',
                    formula: 'C₂H₅NO₂',
                    atoms: { C: 2, H: 5, N: 1, O: 2 },
                    structure: 'amino-acid',
                    instructions: [
                        'Build the central carbon (alpha carbon)',
                        'Add the amino group (-NH₂)',
                        'Add the carboxyl group (-COOH)',
                        'Glycine has hydrogen as the side chain'
                    ]
                },
                alanine: {
                    name: 'Alanine',
                    formula: 'C₃H₇NO₂',
                    atoms: { C: 3, H: 7, N: 1, O: 2 },
                    structure: 'amino-acid',
                    instructions: [
                        'Start with glycine structure',
                        'Replace hydrogen side chain with methyl group (-CH₃)',
                        'Ensure proper bonding geometry',
                        'Verify the complete structure'
                    ]
                }
            }
        };
    }

    /**
     * Set up all event listeners for the interface
     */
    setupEventListeners() {
        // Procedure navigation
        document.querySelectorAll('.procedure-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProcedure(parseInt(e.target.dataset.procedure));
            });
        });

        // Molecule selection
        document.querySelectorAll('.molecule-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectMolecule(e.target.dataset.molecule);
            });
        });

        // Drag and drop functionality
        this.setupDragAndDrop();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    /**
     * Set up drag and drop functionality for atoms
     */
    setupDragAndDrop() {
        const atomButtons = document.querySelectorAll('.atom-btn');
        const buildArea = document.getElementById('buildArea');

        atomButtons.forEach(btn => {
            btn.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.atom);
                e.target.classList.add('dragging');
                this.showFeedback('Drag the atom to the build area', 'info');
            });

            btn.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        buildArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            buildArea.classList.add('drag-over');
        });

        buildArea.addEventListener('dragleave', (e) => {
            if (!buildArea.contains(e.relatedTarget)) {
                buildArea.classList.remove('drag-over');
            }
        });

        buildArea.addEventListener('drop', (e) => {
            e.preventDefault();
            buildArea.classList.remove('drag-over');
            const atomType = e.dataTransfer.getData('text/plain');
            this.addAtomToBuildArea(atomType, e.clientX, e.clientY);
        });
    }

    /**
     * Add an atom to the building area
     */
    addAtomToBuildArea(atomType, x, y) {
        const buildArea = document.getElementById('buildArea');
        const rect = buildArea.getBoundingClientRect();
        
        // Calculate position relative to build area
        const relativeX = ((x - rect.left) / rect.width) * 100;
        const relativeY = ((y - rect.top) / rect.height) * 100;

        // Create atom element
        const atom = document.createElement('div');
        atom.className = `placed-atom atom-${atomType.toLowerCase()}`;
        atom.textContent = atomType;
        atom.style.position = 'absolute';
        atom.style.left = `${relativeX}%`;
        atom.style.top = `${relativeY}%`;
        atom.style.transform = 'translate(-50%, -50%)';
        atom.style.width = '40px';
        atom.style.height = '40px';
        atom.style.borderRadius = '50%';
        atom.style.display = 'flex';
        atom.style.alignItems = 'center';
        atom.style.justifyContent = 'center';
        atom.style.fontWeight = '700';
        atom.style.cursor = 'move';
        atom.style.border = '2px solid #333';
        atom.dataset.atom = atomType;

        // Apply atom-specific styling
        this.applyAtomStyling(atom, atomType);

        buildArea.appendChild(atom);
        buildArea.classList.add('has-molecule');

        // Make atom draggable within build area
        this.makeAtomMovable(atom);

        this.showFeedback(`${this.getAtomName(atomType)} atom added`, 'success');
        this.checkMoleculeCompletion();
    }

    /**
     * Apply styling based on atom type
     */
    applyAtomStyling(element, atomType) {
        const styles = {
            H: { background: '#ecf0f1', color: '#2c3e50' },
            C: { background: '#2c3e50', color: 'white' },
            O: { background: '#e74c3c', color: 'white' },
            N: { background: '#3498db', color: 'white' }
        };

        if (styles[atomType]) {
            Object.assign(element.style, styles[atomType]);
        }
    }

    /**
     * Make an atom movable within the build area
     */
    makeAtomMovable(atom) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        atom.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = parseFloat(atom.style.left);
            initialY = parseFloat(atom.style.top);
            atom.style.zIndex = '1000';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const buildArea = document.getElementById('buildArea');
            const rect = buildArea.getBoundingClientRect();
            
            const deltaX = (e.clientX - startX) / rect.width * 100;
            const deltaY = (e.clientY - startY) / rect.height * 100;
            
            const newX = Math.max(5, Math.min(95, initialX + deltaX));
            const newY = Math.max(5, Math.min(95, initialY + deltaY));
            
            atom.style.left = `${newX}%`;
            atom.style.top = `${newY}%`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                atom.style.zIndex = 'auto';
                this.checkMoleculeCompletion();
            }
        });

        // Add double-click to remove
        atom.addEventListener('dblclick', () => {
            atom.remove();
            this.showFeedback('Atom removed', 'info');
            this.checkMoleculeCompletion();
        });
    }

    /**
     * Get the full name of an atom
     */
    getAtomName(symbol) {
        const names = {
            H: 'Hydrogen',
            C: 'Carbon',
            O: 'Oxygen',
            N: 'Nitrogen'
        };
        return names[symbol] || symbol;
    }

    /**
     * Check if the current molecule is completed correctly
     */
    checkMoleculeCompletion() {
        const buildArea = document.getElementById('buildArea');
        const placedAtoms = buildArea.querySelectorAll('.placed-atom');
        const currentMoleculeData = this.moleculeData[this.currentProcedure][this.currentMolecule];
        
        if (!currentMoleculeData) return;

        // Count placed atoms
        const atomCounts = {};
        placedAtoms.forEach(atom => {
            const type = atom.dataset.atom;
            atomCounts[type] = (atomCounts[type] || 0) + 1;
        });

        // Check if counts match required
        const required = currentMoleculeData.atoms;
        let isComplete = Object.keys(required).length > 0;
        
        for (const [atom, count] of Object.entries(required)) {
            if ((atomCounts[atom] || 0) !== count) {
                isComplete = false;
                break;
            }
        }

        // Check for extra atoms
        for (const atom of Object.keys(atomCounts)) {
            if (!required[atom]) {
                isComplete = false;
                break;
            }
        }

        if (isComplete) {
            this.completeMolecule();
        }
    }

    /**
     * Handle molecule completion
     */
    completeMolecule() {
        this.completedMolecules.add(`${this.currentProcedure}-${this.currentMolecule}`);
        
        // Update UI to show completion
        const currentItem = document.querySelector(`.molecule-item[data-molecule="${this.currentMolecule}"]`);
        if (currentItem) {
            currentItem.classList.add('completed');
        }

        this.showFeedback('Molecule completed successfully! 🎉', 'success');
        
        // Auto-advance to next molecule or show completion message
        setTimeout(() => {
            this.advanceToNextMolecule();
        }, 2000);
    }

    /**
     * Advance to the next uncompleted molecule
     */
    advanceToNextMolecule() {
        const currentProcedureMolecules = Object.keys(this.moleculeData[this.currentProcedure]);
        const currentIndex = currentProcedureMolecules.indexOf(this.currentMolecule);
        
        // Find next uncompleted molecule in current procedure
        for (let i = currentIndex + 1; i < currentProcedureMolecules.length; i++) {
            const molecule = currentProcedureMolecules[i];
            if (!this.completedMolecules.has(`${this.currentProcedure}-${molecule}`)) {
                this.selectMolecule(molecule);
                return;
            }
        }

        // If all molecules in current procedure are complete, suggest next procedure
        if (this.currentProcedure < 3) {
            this.showFeedback(`Procedure ${this.currentProcedure} complete! Try Procedure ${this.currentProcedure + 1}`, 'success');
        } else {
            this.showFeedback('Congratulations! All procedures completed!', 'success');
        }
    }

    /**
     * Switch to a different procedure
     */
    switchProcedure(procedureNum) {
        if (procedureNum === this.currentProcedure) return;
        
        this.currentProcedure = procedureNum;
        
        // Update procedure button states
        document.querySelectorAll('.procedure-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-procedure="${procedureNum}"]`).classList.add('active');
        
        // Update molecules list
        this.updateMoleculesList();
        
        // Select first molecule in new procedure
        const firstMolecule = Object.keys(this.moleculeData[procedureNum])[0];
        this.selectMolecule(firstMolecule);
        
        this.showFeedback(`Switched to Procedure ${procedureNum}`, 'info');
    }

    /**
     * Update the molecules list based on current procedure
     */
    updateMoleculesList() {
        const moleculesList = document.querySelector('.molecules-list');
        const molecules = this.moleculeData[this.currentProcedure];
        
        moleculesList.innerHTML = '';
        
        Object.entries(molecules).forEach(([key, data]) => {
            const li = document.createElement('li');
            li.className = 'molecule-item';
            li.dataset.molecule = key;
            li.textContent = `${data.name} (${data.formula})`;
            
            // Check if completed
            if (this.completedMolecules.has(`${this.currentProcedure}-${key}`)) {
                li.classList.add('completed');
            }
            
            li.addEventListener('click', () => this.selectMolecule(key));
            moleculesList.appendChild(li);
        });
    }

    /**
     * Select a molecule to build
     */
    selectMolecule(moleculeKey) {
        this.currentMolecule = moleculeKey;
        
        // Update molecule selection UI
        document.querySelectorAll('.molecule-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-molecule="${moleculeKey}"]`).classList.add('active');
        
        this.updateDisplay();
        this.clearBuildArea();
    }

    /**
     * Clear the build area
     */
    clearBuildArea() {
        const buildArea = document.getElementById('buildArea');
        const placedAtoms = buildArea.querySelectorAll('.placed-atom');
        placedAtoms.forEach(atom => atom.remove());
        buildArea.classList.remove('has-molecule');
    }

    /**
     * Update the display with current molecule information
     */
    updateDisplay() {
        const moleculeData = this.moleculeData[this.currentProcedure][this.currentMolecule];
        if (!moleculeData) return;
        
        // Update instruction header
        const instructionHeader = document.querySelector('.current-instruction');
        instructionHeader.textContent = `Build ${moleculeData.name} (${moleculeData.formula})`;
        
        // Update instruction list
        const instructionList = document.querySelector('.instruction-list');
        instructionList.innerHTML = '';
        
        moleculeData.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionList.appendChild(li);
        });
    }

    /**
     * Show feedback message to user
     */
    showFeedback(message, type = 'info') {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create new feedback
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        
        // Insert after workspace divider
        const divider = document.querySelector('.workspace-divider');
        divider.parentNode.insertBefore(feedback, divider.nextSibling);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 4000);
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        switch(e.key) {
            case 'Escape':
                this.clearBuildArea();
                this.showFeedback('Build area cleared', 'info');
                break;
            case 'r':
            case 'R':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.clearBuildArea();
                    this.showFeedback('Build area reset', 'info');
                }
                break;
            case '1':
            case '2':
            case '3':
                if (!e.target.matches('input, textarea')) {
                    this.switchProcedure(parseInt(e.key));
                }
                break;
        }
    }
}

// Initialize the lab when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BiologicalMoleculesLab();
});

// Export for potential testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BiologicalMoleculesLab;
}