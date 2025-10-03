import { useEffect, useRef } from "react";
import * as go from "gojs";
import { Input, message } from "antd";
import familyData from "../../content/FamilyContent.json";

const { Search } = Input;

const FamilyTreeDiagram = () => {
    const diagramRef = useRef<HTMLDivElement | null>(null);
    const myDiagramRef = useRef<go.Diagram | null>(null);

    useEffect(() => {
        if (diagramRef.current) {
            const $ = go.GraphObject.make;

            const myDiagram = $(go.Diagram, diagramRef.current, {
                "undoManager.isEnabled": true,
                layout: $(go.TreeLayout, { angle: 90, layerSpacing: 40 }),
                contentAlignment: go.Spot.Center,
            });

            myDiagramRef.current = myDiagram;

            myDiagram.nodeTemplate = $(
                go.Node,
                "Auto",
                $(
                    go.Shape,
                    "RoundedRectangle",
                    {
                        fill: "#2E8B57",
                        stroke: null,
                        parameter1: 10,
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
                            height: 120,
                        },
                        $(go.Shape, "Circle", {
                            width: 120,
                            height: 120,
                            strokeWidth: 0,
                            fill: "#eee",
                        }),
                        $(
                            go.Picture,
                            {
                                width: 120,
                                height: 120,
                                imageStretch: go.ImageStretch.UniformToFill,
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
                        },
                        $(
                            go.TextBlock,
                            { row: 0, font: "bold 14px sans-serif", stroke: "white" },
                            new go.Binding("text", "name")
                        ),
                        $(
                            go.TextBlock,
                            { row: 1, font: "12px sans-serif", stroke: "white" },
                            new go.Binding("text", "fechaNacimiento", (f) => `Nacimiento: ${f}`)
                        ),
                        $(
                            go.TextBlock,
                            { row: 2, font: "12px sans-serif", stroke: "white" },
                            new go.Binding("text", "edad", (e) => `Edad: ${e} años`)
                        ),
                        $(
                            go.TextBlock,
                            { row: 3, font: "12px sans-serif", stroke: "white" },
                            new go.Binding(
                                "text",
                                "lugarNacimiento",
                                (l) => `Lugar: ${l}`
                            )
                        )
                    )
                )
            );

            myDiagram.linkTemplate = $(
                go.Link,
                { routing: go.Routing.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 2, stroke: "#555" })
            );

            myDiagram.model = new go.TreeModel(familyData);
        }
    }, []);

    const normalizeText = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const handleSearch = (value: string) => {
        const diagram = myDiagramRef.current;
        if (!diagram) return;

        diagram.startTransaction("highlight search");
        diagram.clearSelection();

        const searchTerm = normalizeText(value);
        let foundNode: go.Node | null = null;

        diagram.nodes.each(node => {
            if (normalizeText(node.data.name).includes(searchTerm)) {
                foundNode = node;
            }
        });

        if (foundNode) {
            diagram.select(foundNode);

            const node = foundNode as any;
            if (node.actualBounds) {
                diagram.centerRect(node.actualBounds);
            }

            setTimeout(() => {
                if (node.actualBounds) {
                    diagram.centerRect(node.actualBounds);
                }
            }, 10);

            diagram.scale = 3.0; 
        } else {
            message.warning("No se encontró un familiar con ese nombre");
            diagram.scale = 1.2; 
        }

        diagram.commitTransaction("highlight search");
    };


    return (
        <div>
            <Search
                placeholder="Buscar familiar..."
                enterButton="Buscar"
                onSearch={handleSearch}
                style={{ marginBottom: 20, maxWidth: 300 }}
            />
            <div
                ref={diagramRef}
                style={{
                    width: "100%",
                    height: "1000px",
                    border: "1px solid #ccc",
                    background: "#caf7ddff",
                }}
            ></div>
        </div>
    );
};

export default FamilyTreeDiagram;
