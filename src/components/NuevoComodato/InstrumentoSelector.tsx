// import { Button, Form, Input, InputNumber, Select } from "antd";
// import { useFetchInstrumentos } from "../../api/hooks/get_instrumentos";

// const InstrumentoSelector: React.FC = () => {
//   const { instrumentos } = useFetchInstrumentos();

//   return (
//     <Form.List name="instrumentos">
//       {(fields, { add, remove }) => (
//         <div>
//           {fields.map(({ key, name }) => (
//             <div
//               key={key}
//               className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-4"
//             >
//               {/* Instrumento Selector */}
//               <Form.Item
//                 name={[name, "id"]}
//                 rules={[
//                   { required: true, message: "Seleccione un instrumento" },
//                 ]}
//                 className="flex-1"
//               >
//                 <Select
//                   showSearch
//                   placeholder="Seleccione un instrumento"
//                   optionFilterProp="children"
//                   className="w-full"
//                 >
//                   {instrumentos.map((instrumento) => (
//                     <Select.Option key={instrumento.id} value={instrumento.id}>
//                       {`${instrumento.producto} - ${instrumento.codigo}`}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               <Form.Item
//                 name="valorInstrumentoNeto"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Ingrese la cantidad de dinero",
//                   },
//                 ]}
//               >
//                 <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
//                   <div className="w-full">
//                     <Select placeholder="Moneda" className="w-fit">
//                       <Select.Option value="CLP">CLP</Select.Option>
//                       <Select.Option value="UF">UF</Select.Option>
//                     </Select>
//                   </div>
//                   <Input min={1} className="w-full" placeholder="Valor Neto" />
//                 </div>
//               </Form.Item>

//               <Form.Item
//                 name={[name, "cantidad"]}
//                 rules={[
//                   { required: true, message: "Ingrese la cantidad" },
//                   {
//                     type: "number",
//                     min: 1,
//                     message: "La cantidad debe ser mayor a 0",
//                   },
//                 ]}
//                 className="w-full"
//               >
//                 <InputNumber
//                   min={1}
//                   placeholder="Cantidad"
//                   className="w-full"
//                 />
//               </Form.Item>

//               <Form.Item>
//                 <Button
//                   type="default"
//                   danger
//                   onClick={() => remove(name)}
//                   className="flex-shrink-0"
//                 >
//                   Quitar
//                 </Button>
//               </Form.Item>
//             </div>
//           ))}

//           {/* Add Instrumento Button */}
//           <Button type="dashed" onClick={() => add()} className="w-full">
//             Agregar Instrumento
//           </Button>
//         </div>
//       )}
//     </Form.List>
//   );
// };

// export default InstrumentoSelector;
