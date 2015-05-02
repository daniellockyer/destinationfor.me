import org.apache.pdfbox.cos.COSDocument;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;

import java.io.*;
import java.util.HashSet;

public class CVParser {
    int age;
    HashSet<String> universities;
    HashSet<String> courseName;
    HashSet<String> jobTitle;

    public static void main(String args[]) throws IOException {
        String fileLocation = args[0];
        CVParser parser = new CVParser();
        parser.parse(fileLocation);
    }

    public void parse(String fileLocation) throws IOException {
        String pdfContent = parsePDF(fileLocation);
        BufferedReader reader = new BufferedReader(new StringReader(pdfContent));
        StringBuilder cleanString = new StringBuilder("");
        long numberOfLines = reader.lines().count();
        //Reset BufferedReader to start of file after counting lines.
        reader = new BufferedReader(new StringReader(pdfContent));
        for (int i = 0; i < numberOfLines; i++)
            cleanString.append(reader.readLine().trim() + "\n");

        String[] paragraphs = cleanString.toString().split("\n\n");
        universities = getUniversities(paragraphs);
        courseName = getCourses(paragraphs);
        jobTitle = getJobs(paragraphs);
        System.out.println(universities);
        System.out.println(courseName);
        System.out.println(jobTitle);
    }

    public HashSet<String> getUniversities(String[] paragraphs) {
        HashSet<String> universities = new HashSet<>();

        for (String paragraph : paragraphs) {
            if (paragraph.toLowerCase().contains("college") || paragraph.toLowerCase().contains("uni")) {
                String[] lines = paragraph.split("\n");
                for (String line : lines) {
                    for (String uni : University.UNIVERSITY) {
                        if (line.toLowerCase().contains(uni.toLowerCase())) {
                            universities.add(uni);
                            break;
                        }
                    }
                }
            }
        }

        return universities;
    }

    public HashSet<String> getCourses(String[] paragraphs) {
        HashSet<String> courses = new HashSet<>();

        for (String course : Courses.COURSES) {
            for (String paragraph : paragraphs) {

                if (paragraph.toLowerCase().contains(course.toLowerCase())) {
                    courses.add(course);
                }
            }
        }

        return courses;
    }

    public HashSet<String> getJobs(String[] paragraphs) {
        HashSet<String> jobs = new HashSet<>();

        for (String paragraph : paragraphs) {
            String[] lines = paragraph.split("\n");
            for (String line : lines) {
                for (String job : Jobs.JOBS) {
                    if (line.toLowerCase().contains(job.toLowerCase())) {
                        jobs.add(job);
                        break;
                    }
                }
            }

        }

        return jobs;
    }

    public String parsePDF(String fileLocation) throws IOException {
        File file = new File(fileLocation);
        if (!file.isFile()) {
            throw new IOException("File " + fileLocation + " does not exist.");
        }
        PDFParser pdfParser = new PDFParser(new FileInputStream(file));
        pdfParser.parse();
        COSDocument cosDoc = pdfParser.getDocument();
        PDFTextStripper pdfStripper = new PDFTextStripper();
        PDDocument pdDoc = new PDDocument(cosDoc);
        pdfStripper.setStartPage(1);
        pdfStripper.setEndPage(pdDoc.getNumberOfPages());
        String parsedText = pdfStripper.getText(pdDoc);
        return parsedText;
    }

}
