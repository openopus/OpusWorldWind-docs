import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

    public examples = [];

    constructor() { }

    ngOnInit(): void {
        this.loadExamples();
    }

    public loadExamples() {
        this.examples = [
            {
                id: 'basic',
                name: 'Basic Demo',
                path: 'examples/basic',
                description: "Demonstrates basic abilities of setting up OWW with WWW."
            },
            {
                id: 'shapes',
                name: 'Shapes Demo',
                path: 'examples/shapes',
                description: "Shows all the different shapes of OWW."
            },
            {
                id: 'placemarks',
                name: 'Placemarks Demo',
                path: 'examples/placemarks',
                description: "Shows some different placemarks of OWW."
            }
        ]
    }

}
