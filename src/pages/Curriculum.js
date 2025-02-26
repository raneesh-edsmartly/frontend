import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import standardsService from '../services/standardsService';

const Curriculum = () => {
  const [error, setError] = useState(null);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [standardsSets, setStandardsSets] = useState([]);
  const [standards, setStandards] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Selected values
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStandardSet, setSelectedStandardSet] = useState('');

  const [loadingStandards, setLoadingStandards] = useState(false);

  // Fetch jurisdictions on mount
  useEffect(() => {
    const fetchJurisdictions = async () => {
      try {
        const response = await standardsService.getJurisdictions();
        if (response.error) throw new Error(response.error);
        setJurisdictions(response.data || []);
      } catch (err) {
        setError('Unable to load jurisdictions. Please try again later.');
      }
    };
    fetchJurisdictions();
  }, []);

  // Fetch jurisdiction details when jurisdiction changes
  useEffect(() => {
    const fetchJurisdictionDetails = async () => {
      if (!selectedJurisdiction) {
        resetSelections(['grade', 'subject', 'set', 'standards']);
        return;
      }

      try {
        setLoadingStandards(true);
        const response = await standardsService.getJurisdiction(selectedJurisdiction);
        if (response.error) throw new Error(response.error);

        const sets = response.data || [];
        const uniqueGrades = [...new Set(sets.flatMap(set => set.educationLevels || []))].sort();
        const uniqueSubjects = [...new Set(sets.map(set => set.subject))].filter(Boolean).sort();

        setGradeLevels(uniqueGrades);
        setSubjects(uniqueSubjects);
        setStandardsSets(sets);

        // Automatically select the standards set if there's only one for the selected grade and subject
        if (selectedGradeLevel && selectedSubject) {
          const filteredSets = sets.filter(set => {
            const matchesGrade = (set.educationLevels || []).includes(selectedGradeLevel);
            const matchesSubject = set.subject === selectedSubject;
            return matchesGrade && matchesSubject;
          });

          if (filteredSets.length === 1) {
            setSelectedStandardSet(filteredSets[0].id);
          }
        }
      } catch (err) {
        setError('Unable to load jurisdiction details. Please try again later.');
      } finally {
        setLoadingStandards(false);
      }
    };

    fetchJurisdictionDetails();
  }, [selectedJurisdiction, selectedGradeLevel, selectedSubject]);

  // Fetch standards when standard set changes
  useEffect(() => {
    const fetchStandards = async () => {
      if (!selectedStandardSet) {
        setStandards([]);
        return;
      }

      try {
        setLoadingStandards(true);
        const response = await standardsService.getStandards(selectedStandardSet);
        if (response.error) throw new Error(response.error);

        const standardsArray = Object.values(response.data || {})
          .sort((a, b) => a.position - b.position);
        setStandards(standardsArray);
      } catch (err) {
        setError('Unable to load standards. Please try again later.');
      } finally {
        setLoadingStandards(false);
      }
    };

    fetchStandards();
  }, [selectedStandardSet]);

  const resetSelections = (levels) => {
    if (levels.includes('grade')) {
      setSelectedGradeLevel('');
      setGradeLevels([]);
    }
    if (levels.includes('subject')) {
      setSelectedSubject('');
      setSubjects([]);
    }
    if (levels.includes('set')) {
      setSelectedStandardSet('');
      setStandardsSets([]);
    }
    if (levels.includes('standards')) {
      setStandards([]);
    }
  };

  const getFilteredStandardsSets = () => {
    return standardsSets.filter(set => {
      const matchesGrade = !selectedGradeLevel || 
        (set.educationLevels || []).includes(selectedGradeLevel);
      const matchesSubject = !selectedSubject || 
        set.subject === selectedSubject;
      return matchesGrade && matchesSubject;
    });
  };

  const renderDropdown = ({ label, value, onChange, options, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderStandard = (standard, level = 0) => (
    <div 
      key={standard.id}
      className={`pl-${level * 4} py-2 border-b border-gray-100`}
    >
      <div className="flex items-start gap-2">
        {standard.listId && (
          <span className="text-gray-500 min-w-[2rem]">{standard.listId}</span>
        )}
        <div>
          {standard.description}
          {standard.statementNotation && (
            <span className="ml-2 text-sm text-gray-500">
              ({standard.statementNotation})
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Educational Standards Browser</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Jurisdiction Dropdown */}
            {renderDropdown({
              label: "Jurisdiction",
              value: selectedJurisdiction,
              onChange: (e) => {
                setSelectedJurisdiction(e.target.value);
                resetSelections(['grade', 'subject', 'set', 'standards']);
              },
              options: jurisdictions.map(j => ({
                value: j.id,
                label: j.title || j.name
              })),
              placeholder: "Select Jurisdiction"
            })}

            {/* Grade Level Dropdown */}
            {gradeLevels.length > 0 && renderDropdown({
              label: "Grade Level",
              value: selectedGradeLevel,
              onChange: (e) => {
                setSelectedGradeLevel(e.target.value);
                resetSelections(['set', 'standards']);
              },
              options: gradeLevels.map(grade => ({
                value: grade,
                label: `Grade ${grade}`
              })),
              placeholder: "Select Grade Level"
            })}

            {/* Subject Dropdown */}
            {subjects.length > 0 && renderDropdown({
              label: "Subject",
              value: selectedSubject,
              onChange: (e) => {
                setSelectedSubject(e.target.value);
                resetSelections(['set', 'standards']);
              },
              options: subjects.map(subject => ({
                value: subject,
                label: subject
              })),
              placeholder: "Select Subject"
            })}

            {/* Display Standards Set if only one exists */}
            {selectedGradeLevel && selectedSubject && getFilteredStandardsSets().length === 1 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Standards Set</h2>
                <div className="border rounded-lg p-4 bg-gray-50">
                  {getFilteredStandardsSets()[0].title}
                </div>
              </div>
            )}

            {/* Standards Set Dropdown if multiple exist */}
            {selectedGradeLevel && selectedSubject && getFilteredStandardsSets().length > 1 && (
              renderDropdown({
                label: "Standards Set",
                value: selectedStandardSet,
                onChange: (e) => {
                  setSelectedStandardSet(e.target.value);
                  resetSelections(['standards']);
                },
                options: getFilteredStandardsSets().map(set => ({
                  value: set.id,
                  label: set.title
                })),
                placeholder: "Select Standards Set"
              })
            )}

            {/* Standards Display */}
            {selectedStandardSet && standards.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Standards</h2>
                <div className="border rounded-lg divide-y">
                  {standards.map(standard => renderStandard(standard, standard.depth))}
                </div>
              </div>
            )}

            {selectedStandardSet && !loadingStandards && standards.length === 0 && (
              <p className="text-sm text-gray-500">
                No standards found for this set.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;