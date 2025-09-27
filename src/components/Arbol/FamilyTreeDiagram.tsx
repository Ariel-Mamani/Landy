import { useEffect, useRef } from 'react';
import * as go from 'gojs';

const FamilyTreeDiagram = () => {
    const diagramRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (diagramRef.current) {
            const $ = go.GraphObject.make;

            const myDiagram = $(go.Diagram, diagramRef.current, {
                "undoManager.isEnabled": true,
                layout: $(go.TreeLayout, { angle: 90, layerSpacing: 40 }),
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

                    // 📌 Imagen circular
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
                            stretch: go.GraphObject.length // hace que el texto ocupe todo el ancho
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

    
            myDiagram.model = new go.TreeModel([
                {
                    key: 1,
                    name: "Agustin Gonzales (Yo)",
                    fechaNacimiento: "2000-05-14",
                    edad: 24,
                    lugarNacimiento: "Buenos Aires",
                    source: "/img/svg/hijo.jpg"
                },
                {
                    key: 2,
                    parent: 1,
                    name: "Padre",
                    fechaNacimiento: "1975-09-10",
                    edad: 49,
                    lugarNacimiento: "Buenos Aires",
                    source: "/img/svg/padre.jpg"
                },
                {
                    key: 3,
                    parent: 1,
                    name: "Madre",
                    fechaNacimiento: "1978-02-22",
                    edad: 46,
                    lugarNacimiento: "Córdoba",
                    source: "/img/svg/madre.jpg"
                },
                {
                    key: 4,
                    parent: 2,
                    name: "Abuelo",
                    fechaNacimiento: "1950-11-03",
                    edad: 74,
                    lugarNacimiento: "Mendoza",
                    source: "/img/svg/abuelo2.jpg"
                },
                {
                    key: 5,
                    parent: 2,
                    name: "Abuela",
                    fechaNacimiento: "1952-07-19",
                    edad: 72,
                    lugarNacimiento: "Mendoza",
                    source: "/img/svg/abuela.jpg"
                },
                {
                    key: 6,
                    parent: 3,
                    name: "Abuelo",
                    fechaNacimiento: "1950-11-03",
                    edad: 75,
                    lugarNacimiento: "Cordoba",
                    source: "/img/svg/abuelo.jpg"
                },
                {
                    key: 7,
                    parent: 3,
                    name: "Abuela",
                    fechaNacimiento: "1952-07-19",
                    edad: 74,
                    lugarNacimiento: "Cordoba",
                    source: "/img/svg/abuela2.jpg"
                }
            ]);
        }
    }, []);

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Ejemplo de Árbol Genealógico</h3>
            <div
                ref={diagramRef}
                style={{
                    width: "100%",
                    height: "1000px",
                    border: "1px solid #ccc",
                    background: "#f9f9f9",
                }}
            ></div>
        </div>
    );
};

export default FamilyTreeDiagram;
