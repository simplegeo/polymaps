import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Shape;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphVector;
import java.awt.geom.PathIterator;
import java.awt.image.BufferedImage;

public class FontRender {
  public static void main(String[] args) {
    String fontName = args.length > 0 ? args[0] : "Helvetica Neue";
    int fontSize = args.length > 1 ? Integer.parseInt(args[1]) : 162;
    String string = "Polymaps";

    Font f = new Font(fontName, Font.BOLD, fontSize);
    BufferedImage b = new BufferedImage(500, 500, BufferedImage.TYPE_INT_RGB);
    Graphics2D g = b.createGraphics();
    GlyphVector v = f.createGlyphVector(g.getFontRenderContext(), string);
    for (int i = 0; i < string.length(); i++) {
      Shape s = v.getGlyphOutline(i);
      PathIterator pi = s.getPathIterator(null);
      while (!pi.isDone()) {
        float[] c = new float[6];
        switch (pi.currentSegment(c)) {
        case PathIterator.SEG_CLOSE: System.out.print("Z"); break;
        case PathIterator.SEG_QUADTO: System.out.print("Q" + c[0] + "," + c[1] + " " + c[2] + "," + c[3]); break;
        case PathIterator.SEG_LINETO: System.out.print("L" + c[0] + "," + c[1]); break;
        case PathIterator.SEG_MOVETO: System.out.print("M" + c[0] + "," + c[1]); break;
        case PathIterator.SEG_CUBICTO: System.out.print("C" + c[0] + "," + c[1] + " " + c[2] + "," + c[3] + " " + c[4] + "," + c[5]);  break;
        }
        pi.next();
      }
      System.out.println("");
    }
    System.out.flush();
  }
}
