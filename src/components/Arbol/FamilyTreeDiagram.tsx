import { useEffect, useRef } from 'react';
import * as go from 'gojs';
import familyData from "../../content/FamilyContent.json";


const FamilyTreeDiagram = () => {
    const diagramRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (diagramRef.current) {
            const $ = go.GraphObject.make;

            const myDiagram = $(go.Diagram, diagramRef.current, {
                "undoManager.isEnabled": true,
                layout: $(go.TreeLayout, { angle: 90, layerSpacing: 40 }),
                contentAlignment: go.Spot.Center,
            });
            // Plantilla para cada nodo
            myDiagram.nodeTemplate = $(
                go.Node,
                "Auto",
                $(
                    go.Shape,
                    "RoundedRectangle",
                    {
                        fill: "#2E8B57",
                        stroke: null,
                        parameter1: 10
                    }
                ),
                $(
                    go.Panel,
                    "Vertical",
                    { margin: 8, defaultAlignment: go.Spot.Center },

                    
                    $(
                        go.Panel,
                        "Spot",
                        {
                            isClipping: true,
                            width: 120,
                            height: 120
                        },
                        $(
                            go.Shape,
                            "Circle",
                            { width: 120, height: 120, strokeWidth: 0, fill: "#eee" }
                        ),
                        $(
                            go.Picture,
                            {
                                width: 120,
                                height: 120,
                                imageStretch: go.ImageStretch.UniformToFill
                            },
                            new go.Binding("source")
                        )
                    ),


                    $(
                        go.Panel,
                        "Table",
                        {
                            margin: 8,
                            defaultAlignment: go.Spot.Left,
                            stretch: go.GraphObject.length 
                        },
                        $(
                            go.TextBlock,
                            { row: 0, font: "bold 14px sans-serif", stroke: "white" },
                            new go.Binding("text", "name")
                        ),
                        $(
                            go.TextBlock,
                            { row: 1, font: "12px sans-serif", stroke: "white" },
                            new go.Binding("text", "fechaNacimiento", f => `Nacimiento: ${f}`)
                        ),
                        $(
                            go.TextBlock,
                            { row: 2, font: "12px sans-serif", stroke: "white" },
                            new go.Binding("text", "edad", e => `Edad: ${e} años`)
                        ),
                        $(
                            go.TextBlock,
                            { row: 3, font: "12px sans-serif", stroke: "white" },
                            new go.Binding("text", "lugarNacimiento", l => `Lugar: ${l}`)
                        )
                    )
                )
            );



            // Enlaces entre nodos
            myDiagram.linkTemplate = $(
                go.Link,
                { routing: go.Routing.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 2, stroke: "#555" })
            );

    
            myDiagram.model = new go.TreeModel(familyData);
        }
    }, []);

    return (
        <div>
            <div
                ref={diagramRef}
                style={{
                    width: "100%",
                    height: "1000px",
                    border: "1px solid #ccc",
                    background: "#f9f9f9",
                    justifyContent: "center",   
                    alignItems: "center"  
                }}
            ></div>
        </div>
    );
};

export default FamilyTreeDiagram;
