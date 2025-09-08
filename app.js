/**
 * Biological Molecules Interactive Lab
 * 
 * An educational web application for chemistry students to learn about
 * molecular structures through interactive drag-and-drop exercises.
 * 
 * Author: GitHub Copilot
 * Version: 1.0.0
 */

class BiologicalMoleculesLab {
    constructor() {
        // Lab state
        this.state = {
            currentProcedure: 0,
            currentMolecule: null,
            completedMolecules: new Set(),
            moleculeSteps: new Map(),
            isInitialized: false
        };

        // Molecule data organized by procedure
        this.molecules = {
            0: [ // Procedure 1: Simple Molecules
                {
                    id: 'water',
                    name: 'Water',
                    formula: 'H₂O',
                    bondShape: 'bent',
                    atoms: [
                        { type: 'O', x: 50, y: 30 },
                        { type: 'H', x: 20, y: 70 },
                        { type: 'H', x: 80, y: 70 }
                    ]
                },
                {
                    id: 'oxygen',
                    name: 'Oxygen',
                    formula: 'O₂',
                    bondShape: 'linear',
                    atoms: [
                        { type: 'O', x: 30, y: 50 },
                        { type: 'O', x: 70, y: 50 }
                    ]
                },
                {
                    id: 'methane',
                    name: 'Methane',
                    formula: 'CH₄',
                    bondShape: 'tetrahedral',
                    atoms: [
                        { type: 'C', x: 50, y: 50 },
                        { type: 'H', x: 30, y: 30 },
                        { type: 'H', x: 70, y: 30 },
                        { type: 'H', x: 30, y: 70 },
                        { type: 'H', x: 70, y: 70 }
                    ]
                },
                {
                    id: 'carbon-dioxide',
                    name: 'Carbon Dioxide',
                    formula: 'CO₂',
                    bondShape: 'linear',
                    atoms: [
                        { type: 'C', x: 50, y: 50 },
                        { type: 'O', x: 20, y: 50 },
                        { type: 'O', x: 80, y: 50 }
                    ]
                }
            ],
            1: [ // Procedure 2: Amino Acids
                {
                    id: 'glycine',
                    name: 'Glycine',
                    formula: 'C₂H₅NO₂',
                    bondShape: 'amino-acid',
                    atoms: [
                        { type: 'C', x: 40, y: 50 },
                        { type: 'C', x: 60, y: 50 },
                        { type: 'N', x: 20, y: 40 },
                        { type: 'O', x: 75, y: 35 },
                        { type: 'O', x: 75, y: 65 }
                    ]
                },
                {
                    id: 'alanine',
                    name: 'Alanine',
                    formula: 'C₃H₇NO₂',
                    bondShape: 'amino-acid',
                    atoms: [
                        { type: 'C', x: 40, y: 50 },
                        { type: 'C', x: 60, y: 50 },
                        { type: 'C', x: 40, y: 75 },
                        { type: 'N', x: 20, y: 40 },
                        { type: 'O', x: 75, y: 35 },
                        { type: 'O', x: 75, y: 65 }
                    ]
                }
            ],
            2: [ // Procedure 3: Carbohydrates
                {
                    id: 'glucose',
                    name: 'Glucose',
                    formula: 'C₆H₁₂O₆',
                    bondShape: 'hexagon',
                    atoms: [
                        { type: 'C', x: 50, y: 20 },
                        { type: 'C', x: 75, y: 35 },
                        { type: 'C', x: 75, y: 65 },
                        { type: 'C', x: 50, y: 80 },
                        { type: 'C', x: 25, y: 65 },
                        { type: 'O', x: 25, y: 35 }
                    ]
                },
                {
                    id: 'fructose',
                    name: 'Fructose',
                    formula: 'C₆H₁₂O₆',
                    bondShape: 'pentagon',
                    atoms: [
                        { type: 'C', x: 50, y: 25 },
                        { type: 'C', x: 70, y: 45 },
                        { type: 'C', x: 55, y: 70 },
                        { type: 'C', x: 30, y: 65 },
                        { type: 'O', x: 35, y: 40 }
                    ]
                }
            ]
        };

        // Bond shape options for procedure 1
        this.bondShapes = [
            { id: 'bent', name: 'Bent', matches: ['water'] },
            { id: 'linear', name: 'Linear', matches: ['oxygen', 'carbon-dioxide'] },
            { id: 'tetrahedral', name: 'Tetrahedral', matches: ['methane'] },
            { id: 'trigonal-planar', name: 'Trigonal Planar', matches: [] }
        ];

        // DOM elements
        this.elements = {};
        
        // Event handlers
        this.handleProcedureClick = this.handleProcedureClick.bind(this);
        this.handleMoleculeClick = this.handleMoleculeClick.bind(this);
        this.handleBondShapeClick = this.handleBondShapeClick.bind(this);
        this.handleAtomDragStart = this.handleAtomDragStart.bind(this);
        this.handleAtomDragEnd = this.handleAtomDragEnd.bind(this);
        this.handleDropZoneDragOver = this.handleDropZoneDragOver.bind(this);
        this.handleDropZoneDrop = this.handleDropZoneDrop.bind(this);
        this.handleInfoButtonClick = this.handleInfoButtonClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // Initialize the lab
        this.init();
    }

    /**
     * Initialize the lab interface and event listeners
     */
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadProcedure(0);
        this.state.isInitialized = true;
        console.log('Biological Molecules Lab initialized');
    }

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        this.elements = {
            procedureBtns: document.querySelectorAll('.procedure-btn'),
            moleculesList: document.querySelector('.molecules-list'),
            currentInstruction: document.querySelector('.current-instruction'),
            moleculeWorkspace: document.querySelector('.molecule-workspace'),
            atomBtns: document.querySelectorAll('.atom-btn'),
            infoBtn: document.querySelector('.info-btn'),
            modal: document.getElementById('info-modal'),
            modalClose: document.querySelector('.modal-close'),
            atomsPalette: document.querySelector('.atoms-palette')
        };
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Procedure navigation
        this.elements.procedureBtns.forEach(btn => {
            btn.addEventListener('click', this.handleProcedureClick);
        });

        // Atom drag events
        this.elements.atomBtns.forEach(btn => {
            btn.addEventListener('dragstart', this.handleAtomDragStart);
            btn.addEventListener('dragend', this.handleAtomDragEnd);
        });

        // Info modal
        this.elements.infoBtn.addEventListener('click', this.handleInfoButtonClick);
        this.elements.modalClose.addEventListener('click', this.handleModalClose);
        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.handleModalClose();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Handle procedure button clicks
     */
    handleProcedureClick(e) {
        const procedureIndex = parseInt(e.target.dataset.procedure);
        this.loadProcedure(procedureIndex);
    }

    /**
     * Handle molecule list item clicks
     */
    handleMoleculeClick(e) {
        const moleculeId = e.target.dataset.molecule;
        if (moleculeId) {
            this.loadMolecule(moleculeId);
        }
    }

    /**
     * Handle bond shape selection (Procedure 1 only)
     */
    handleBondShapeClick(e) {
        const shapeElement = e.target.closest('.bond-shape');
        if (!shapeElement) return;

        const shapeId = shapeElement.dataset.shapeId;
        const currentMolecule = this.state.currentMolecule;
        
        // Clear previous selections
        document.querySelectorAll('.bond-shape').forEach(shape => {
            shape.classList.remove('selected', 'incorrect');
        });

        // Check if correct
        const molecule = this.molecules[this.state.currentProcedure]
            .find(m => m.id === currentMolecule);
        
        if (molecule && molecule.bondShape === shapeId) {
            shapeElement.classList.add('selected');
            this.advanceToAtomPlacement();
        } else {
            shapeElement.classList.add('incorrect');
            this.showFeedback('Try again! Look at the molecular formula to help identify the correct bond shape.', 'warning');
        }
    }

    /**
     * Handle atom drag start
     */
    handleAtomDragStart(e) {
        const atomType = e.target.dataset.atom;
        e.dataTransfer.setData('text/plain', atomType);
        e.target.classList.add('dragging');
        
        // Highlight compatible drop zones
        this.highlightDropZones(atomType);
    }

    /**
     * Handle atom drag end
     */
    handleAtomDragEnd(e) {
        e.target.classList.remove('dragging');
        this.clearDropZoneHighlights();
    }

    /**
     * Handle drop zone drag over
     */
    handleDropZoneDragOver(e) {
        e.preventDefault();
        e.target.classList.add('highlight');
    }

    /**
     * Handle drop zone drop
     */
    handleDropZoneDrop(e) {
        e.preventDefault();
        const atomType = e.dataTransfer.getData('text/plain');
        const dropZone = e.target;
        const expectedAtom = dropZone.dataset.expectedAtom;
        
        if (atomType === expectedAtom) {
            this.placeAtom(dropZone, atomType);
            this.checkMoleculeCompletion();
        } else {
            this.showFeedback('That atom doesn\'t belong there. Try a different position.', 'warning');
        }
        
        this.clearDropZoneHighlights();
    }

    /**
     * Handle info button click
     */
    handleInfoButtonClick() {
        this.elements.modal.style.display = 'flex';
        this.elements.modalClose.focus();
    }

    /**
     * Handle modal close
     */
    handleModalClose() {
        this.elements.modal.style.display = 'none';
        this.elements.infoBtn.focus();
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyDown(e) {
        if (e.key === 'Escape' && this.elements.modal.style.display === 'flex') {
            this.handleModalClose();
        }
    }

    /**
     * Load a specific procedure
     */
    loadProcedure(procedureIndex) {
        this.state.currentProcedure = procedureIndex;
        
        // Update procedure button states
        this.elements.procedureBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === procedureIndex);
            btn.setAttribute('aria-selected', index === procedureIndex);
        });

        // Update molecules list
        this.renderMoleculesList();

        // Load first molecule of procedure
        const molecules = this.molecules[procedureIndex];
        if (molecules && molecules.length > 0) {
            this.loadMolecule(molecules[0].id);
        }

        console.log(`Loaded procedure ${procedureIndex + 1}`);
    }

    /**
     * Load a specific molecule
     */
    loadMolecule(moleculeId) {
        this.state.currentMolecule = moleculeId;
        
        // Update molecules list active state
        document.querySelectorAll('.molecule-item').forEach(item => {
            item.classList.toggle('active', item.dataset.molecule === moleculeId);
        });

        // Get molecule data
        const molecule = this.molecules[this.state.currentProcedure]
            .find(m => m.id === moleculeId);
        
        if (!molecule) {
            console.error(`Molecule ${moleculeId} not found in procedure ${this.state.currentProcedure}`);
            return;
        }

        // Update instruction
        this.elements.currentInstruction.textContent = 
            `Build ${molecule.name} (${molecule.formula})`;

        // Render appropriate interface for current procedure
        if (this.state.currentProcedure === 0) {
            this.renderBondShapesGrid();
        } else {
            this.renderMoleculeStructure(molecule);
        }

        console.log(`Loaded molecule: ${molecule.name}`);
    }

    /**
     * Render the molecules list for current procedure
     */
    renderMoleculesList() {
        const molecules = this.molecules[this.state.currentProcedure] || [];
        
        this.elements.moleculesList.innerHTML = '';
        
        molecules.forEach(molecule => {
            const li = document.createElement('li');
            li.className = 'molecule-item';
            li.dataset.molecule = molecule.id;
            li.textContent = `${molecule.name} — ${molecule.formula}`;
            
            if (this.state.completedMolecules.has(molecule.id)) {
                li.classList.add('completed');
            }
            
            li.addEventListener('click', this.handleMoleculeClick);
            this.elements.moleculesList.appendChild(li);
        });
    }

    /**
     * Render bond shapes grid (Procedure 1 only)
     */
    renderBondShapesGrid() {
        const workspace = this.elements.moleculeWorkspace;
        workspace.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'bond-shapes-grid';

        this.bondShapes.forEach(shape => {
            const shapeDiv = document.createElement('div');
            shapeDiv.className = 'bond-shape';
            shapeDiv.dataset.shapeId = shape.id;
            shapeDiv.innerHTML = `
                <div class="shape-content">
                    <h4>${shape.name}</h4>
                    <div class="shape-diagram">${this.getShapeDiagram(shape.id)}</div>
                </div>
            `;
            shapeDiv.addEventListener('click', this.handleBondShapeClick);
            grid.appendChild(shapeDiv);
        });

        workspace.appendChild(grid);
        this.enableAtomsPalette(false);
    }

    /**
     * Render molecule structure with drop zones
     */
    renderMoleculeStructure(molecule) {
        const workspace = this.elements.moleculeWorkspace;
        workspace.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'single-molecule';

        const structure = document.createElement('div');
        structure.className = 'molecule-structure';
        structure.style.position = 'relative';
        structure.style.width = '400px';
        structure.style.height = '300px';

        // Add bond lines (simplified representation)
        structure.appendChild(this.createBondLines(molecule));

        // Add drop zones for atoms
        molecule.atoms.forEach((atom, index) => {
            const dropZone = document.createElement('div');
            dropZone.className = 'atom-drop-zone';
            dropZone.dataset.expectedAtom = atom.type;
            dropZone.dataset.atomIndex = index;
            dropZone.style.left = `${atom.x}%`;
            dropZone.style.top = `${atom.y}%`;
            
            dropZone.addEventListener('dragover', this.handleDropZoneDragOver);
            dropZone.addEventListener('drop', this.handleDropZoneDrop);
            dropZone.addEventListener('dragleave', (e) => {
                e.target.classList.remove('highlight');
            });
            
            structure.appendChild(dropZone);
        });

        container.appendChild(structure);
        workspace.appendChild(container);
        this.enableAtomsPalette(true);
    }

    /**
     * Create bond lines for molecule structure
     */
    createBondLines(molecule) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.setAttribute('viewBox', '0 0 100 100');

        // Simple bond line rendering based on molecule type
        const bonds = this.getBondsForMolecule(molecule);
        
        bonds.forEach(bond => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', bond.x1);
            line.setAttribute('y1', bond.y1);
            line.setAttribute('x2', bond.x2);
            line.setAttribute('y2', bond.y2);
            line.setAttribute('stroke', '#6c757d');
            line.setAttribute('stroke-width', '1');
            svg.appendChild(line);
        });

        return svg;
    }

    /**
     * Get bond connections for a molecule
     */
    getBondsForMolecule(molecule) {
        const bonds = [];
        const atoms = molecule.atoms;
        
        // Simple bonding logic - connect atoms based on molecular structure
        switch (molecule.id) {
            case 'water':
                bonds.push(
                    { x1: atoms[0].x, y1: atoms[0].y, x2: atoms[1].x, y2: atoms[1].y },
                    { x1: atoms[0].x, y1: atoms[0].y, x2: atoms[2].x, y2: atoms[2].y }
                );
                break;
            case 'oxygen':
                bonds.push(
                    { x1: atoms[0].x, y1: atoms[0].y, x2: atoms[1].x, y2: atoms[1].y }
                );
                break;
            case 'methane':
                for (let i = 1; i < atoms.length; i++) {
                    bonds.push(
                        { x1: atoms[0].x, y1: atoms[0].y, x2: atoms[i].x, y2: atoms[i].y }
                    );
                }
                break;
            case 'carbon-dioxide':
                bonds.push(
                    { x1: atoms[0].x, y1: atoms[0].y, x2: atoms[1].x, y2: atoms[1].y },
                    { x1: atoms[0].x, y1: atoms[0].y, x2: atoms[2].x, y2: atoms[2].y }
                );
                break;
            default:
                // For more complex molecules, implement specific bonding patterns
                break;
        }
        
        return bonds;
    }

    /**
     * Get shape diagram HTML
     */
    getShapeDiagram(shapeId) {
        const diagrams = {
            'bent': '<div style="transform: rotate(-30deg); width: 60px; height: 3px; background: #6c757d; margin: 20px auto;"></div>',
            'linear': '<div style="width: 80px; height: 3px; background: #6c757d; margin: 20px auto;"></div>',
            'tetrahedral': '<div style="width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-bottom: 40px solid #6c757d; margin: 10px auto;"></div>',
            'trigonal-planar': '<div style="width: 50px; height: 50px; border: 3px solid #6c757d; border-radius: 50%; margin: 10px auto;"></div>'
        };
        return diagrams[shapeId] || '';
    }

    /**
     * Advance from bond shape selection to atom placement
     */
    advanceToAtomPlacement() {
        setTimeout(() => {
            const molecule = this.molecules[this.state.currentProcedure]
                .find(m => m.id === this.state.currentMolecule);
            this.renderMoleculeStructure(molecule);
            this.showFeedback('Great! Now drag the correct atoms to their positions.', 'success');
        }, 1000);
    }

    /**
     * Place an atom in a drop zone
     */
    placeAtom(dropZone, atomType) {
        dropZone.classList.add('filled');
        dropZone.innerHTML = `
            <div class="placed-atom atom-btn ${atomType.toLowerCase()}">
                <span class="atom-symbol">${atomType}</span>
            </div>
        `;
    }

    /**
     * Highlight compatible drop zones for dragged atom
     */
    highlightDropZones(atomType) {
        document.querySelectorAll('.atom-drop-zone').forEach(zone => {
            if (zone.dataset.expectedAtom === atomType && !zone.classList.contains('filled')) {
                zone.classList.add('highlight');
            }
        });
    }

    /**
     * Clear drop zone highlights
     */
    clearDropZoneHighlights() {
        document.querySelectorAll('.atom-drop-zone').forEach(zone => {
            zone.classList.remove('highlight');
        });
    }

    /**
     * Check if current molecule is complete
     */
    checkMoleculeCompletion() {
        const filledZones = document.querySelectorAll('.atom-drop-zone.filled');
        const totalZones = document.querySelectorAll('.atom-drop-zone');
        
        if (filledZones.length === totalZones.length) {
            this.completeMolecule();
        }
    }

    /**
     * Mark molecule as complete and show success
     */
    completeMolecule() {
        this.state.completedMolecules.add(this.state.currentMolecule);
        
        // Update molecules list
        this.renderMoleculesList();
        
        // Show completion message
        this.showCompletion();
        
        console.log(`Molecule ${this.state.currentMolecule} completed`);
    }

    /**
     * Show completion message and next button
     */
    showCompletion() {
        const workspace = this.elements.moleculeWorkspace;
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-message';
        completionDiv.innerHTML = `
            <h3>🎉 Molecule Complete!</h3>
            <p>Great job building the molecular structure!</p>
            <button class="next-btn" type="button">Continue to Next Molecule</button>
        `;
        
        const nextBtn = completionDiv.querySelector('.next-btn');
        nextBtn.addEventListener('click', () => {
            this.loadNextMolecule();
        });
        
        workspace.appendChild(completionDiv);
        this.enableAtomsPalette(false);
    }

    /**
     * Load the next molecule in sequence
     */
    loadNextMolecule() {
        const molecules = this.molecules[this.state.currentProcedure];
        const currentIndex = molecules.findIndex(m => m.id === this.state.currentMolecule);
        
        if (currentIndex < molecules.length - 1) {
            this.loadMolecule(molecules[currentIndex + 1].id);
        } else {
            this.showProcedureComplete();
        }
    }

    /**
     * Show procedure completion message
     */
    showProcedureComplete() {
        const workspace = this.elements.moleculeWorkspace;
        workspace.innerHTML = `
            <div class="completion-message">
                <h3>🏆 Procedure ${this.state.currentProcedure + 1} Complete!</h3>
                <p>You've successfully built all molecules in this procedure.</p>
                ${this.state.currentProcedure < 2 ? 
                    '<button class="next-btn" type="button">Start Next Procedure</button>' :
                    '<p><strong>Congratulations! You\'ve completed the entire lab!</strong></p>'
                }
            </div>
        `;
        
        const nextBtn = workspace.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.loadProcedure(this.state.currentProcedure + 1);
            });
        }
    }

    /**
     * Enable or disable atoms palette
     */
    enableAtomsPalette(enabled) {
        this.elements.atomsPalette.classList.toggle('disabled', !enabled);
    }

    /**
     * Show feedback message
     */
    showFeedback(message, type = 'info') {
        // Simple feedback implementation
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // In a full implementation, you might show a toast notification
        // or update a feedback area in the UI
    }

    /**
     * Get current lab state for debugging
     */
    getState() {
        return { ...this.state };
    }
}

// Initialize the lab when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bioLab = new BiologicalMoleculesLab();
});

// Make lab available globally for debugging
window.BiologicalMoleculesLab = BiologicalMoleculesLab;