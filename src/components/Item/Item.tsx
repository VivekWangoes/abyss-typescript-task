import React, { useState } from "react";
import { TreeNode } from "react-organizational-chart";
import { images } from "../../assets";
export interface Props {
  category: any;
  callback: any;
  delete: any;
  edit: any;
  index: any;
  addNew: any;
  remove: any;
}
const Item = (props: Props) => {
  const [plusClicked, setPlusClicked] = useState(false);
  const [value, setValue] = useState("");
  const [selfEdit, setSelfEdit] = useState(false);
  const [selfValue, setSelfValue] = useState(props.category.value);

  return (
    <TreeNode
      label={
        <div>
          <div>
            {!selfEdit ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "80px",
                }}
              >
                <div
                  style={{
                    border: `${props.category.value ? "1px solid black" : ""}`,
                    padding: `${props.category.value ? "5px" : ""}`,
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <span>{props.category.value}</span>
                </div>
                {!selfEdit && props.category.value && (
                  <div>
                    <button
                      className="inp_btn"
                      onClick={() => {
                        props.addNew(props.category.id);
                      }}
                    >
                      <img
                        src={images.addicon}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                    <button
                      className="inp_btn"
                      onClick={() => {
                        setSelfEdit(true);
                      }}
                    >
                      <img
                        src={images.editicon}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                    <button
                      className="inp_btn"
                      onClick={() => {
                        props.delete(props?.category?.id);
                      }}
                    >
                      <img
                        src={images.deleteicon}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ padding: "5px" }}
                  type="text"
                  value={selfValue}
                  onChange={(event) => {
                    setSelfValue(event?.target?.value);
                  }}
                />
                <button
                  className="inp_btn"
                  onClick={() => {
                    setSelfEdit(false);
                  }}
                >
                  <img
                    src={images.deleteicon}
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
                <button
                  className="inp_btn"
                  onClick={() => {
                    if (selfValue) {
                      props.edit(props.category?.id, selfValue);
                      setSelfEdit(false);
                    } else {
                      alert("Please enter category name");
                    }
                  }}
                >
                  <img
                    src={images.editicon}
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </div>
            )}
            {!props.category.value && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input
                  style={{ height: "20px" }}
                  type="text"
                  value={value}
                  onChange={(event) => {
                    setValue(event?.target?.value);
                  }}
                />
                <button
                  className="inp_btn"
                  style={{ marginTop: "2px" }}
                  onClick={() => {
                    setValue("");
                    props.remove(props.category.id);
                  }}
                >
                  <img
                    src={images.deleteicon}
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
                <button
                  className="inp_btn"
                  onClick={() => {
                    if (value) {
                      props.callback(props.category?.id, value);
                      setValue("");
                    } else {
                      alert("Please enter category name");
                    }
                  }}
                >
                  <img
                    src={images.righticon}
                    style={{ width: "23px", height: "23px" }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      }
    >
      {props.category?.children?.length > 0
        ? props.category?.children?.map((item: any, index: any) => (
            <Item
              category={item}
              index={index}
              callback={(id: any, value: any) => props.callback(id, value)}
              delete={(id: any) => {
                props.delete(id);
              }}
              edit={(id: any, value: any) => {
                props.edit(id, value);
              }}
              addNew={(id: any) => {
                props.addNew(id);
              }}
              remove={(id: any) => {
                props.remove(id);
              }}
            />
          ))
        : null}
    </TreeNode>
  );
};

export default Item;
