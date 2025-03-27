import React, { useState } from "react";

const Skills = ({ skills, onUpdateSkills }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill) {
      onUpdateSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    onUpdateSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold">Skills</h3>
      <div className="flex gap-2 flex-wrap mt-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded flex items-center gap-2"
          >
            {skill}
            <button onClick={() => removeSkill(skill)}>&times;</button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Add new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={addSkill}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Skills;
