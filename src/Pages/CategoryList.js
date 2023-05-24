import React, { useEffect, useState } from "react";
import Item from "../components/Item/Item";
import "./CategoryList.style.css";
import { Tree, TreeNode } from "react-organizational-chart";
import Draggable from "react-draggable";
import { images } from "../assets";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [nestedCategories, setNestedCategories] = useState([]);  

  useEffect(() => {
    if (categoryList.length > 0) {
      categoryList?.map((item) => {
        delete item?.children;
      });
      let list = nestComments(categoryList);
      setNestedCategories(list);
    }
  }, [categoryList]);

  function nestComments(comments) {
    if (comments?.length > 0) {
      let commentList = [...comments];
      const commentMap = {};
      commentList.forEach((comment) => (commentMap[comment?.id] = comment));
      commentList.forEach((comment) => {
        if (
          comment?.parent !== null &&
          !comment?.is_delete &&
          !commentMap[comment?.parent]?.is_delete
        ) {
          const parent = commentMap[comment?.parent];
          (parent.children = parent?.children || []).push(comment);
        }
      });
      return commentList.filter((comment) => {
        return comment?.parent === null && !comment?.is_delete;
      });
    }
  }

  return (
   
        <Tree
          label={
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  selfItem: "center",
                }}
              >
                <div className="main_cat">
                  <span>Category</span>
                </div>
                <button
                  className="main_cat_add"
                  onClick={() => {
                    categoryList?.push({
                      id: Date.now(),
                      parent: null,
                      value: "",
                      is_delete: false,
                    });
                    setCategoryList([...categoryList]);
                  }}
                >
                  <img src={images.addicon} style={{width:"20px", height:"20px"}} />
                </button>
              </div>
            </div>
          }
        >
          {nestedCategories.length > 0 ?
            nestedCategories.map((item, index) => {
              return (
                <Item
                  category={item}
                  index={index}
                  callback={(catId, value) => {
                    categoryList?.map((item, index) => {
                      if (item.id === catId) {
                        item["value"] = value;
                      }
                    });
                    setCategoryList([...categoryList]);
                  }}
                  delete={(id) => {
                    categoryList?.map((item, index) => {
                      if (item.id === id) {
                        item["is_delete"] = true;
                      }
                    });
                    setCategoryList([...categoryList]);
                  }}
                  edit={(id, value) => {
                    categoryList?.map((item, index) => {
                      if (item.id === id) {
                        item["value"] = value;
                      }
                    });
                    setCategoryList([...categoryList]);
                  }}
                  addNew={(id) => {
                    categoryList?.push({
                      id: Date.now(),
                      parent: id,
                      value: "",
                      is_delete: false,
                    });
                    setCategoryList([...categoryList]);
                  }}
                  remove={(id) => {
                    let temp = categoryList;
                    categoryList?.map((item, index) => {
                      if (item.id === id) {
                        temp.splice(index, 1);
                      }
                    });
                    setCategoryList([...categoryList]);
                  }}
                />
              );
            }) : null}
        </Tree>
  );
};

export default CategoryList;
